<?php
namespace App\Http\Controllers;

use App\Models\CompanyPlan;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\DB;

class CompanyPlanController extends Controller
{
    public function index(Request $request)
    {
        $query = CompanyPlan::with(['company', 'plan']);

        if ($request->has('companyID')) {
            $query->where('companyID', $request->companyID);
        }

        if ($request->has('active') && $request->active == 'true') {
            $today = date('Y-m-d');
            $query->where(function($q) use ($today) {
                $q->where('start_date', '<=', $today)
                  ->where(function($q2) use ($today) {
                      $q2->whereNull('end_date')->orWhere('end_date', '>=', $today);
                  });
            });
        }

        $plans = $query->orderBy('start_date', 'desc')->get();

        return response()->json($plans);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'companyID' => 'required|integer|exists:companies,id',
            'Name' => 'nullable|string|max:255',
            'Description' => 'nullable|string',
            'pricingPlanID' => 'required|integer|exists:socialaiplans,id',
            'start_date' => 'required|date',
            'end_date' => 'nullable|date|after_or_equal:start_date',
            'price' => 'nullable|numeric|min:0',
            'discount' => 'nullable|numeric|min:0',
            'finalprice' => 'nullable|numeric|min:0',
            'monthyear' => ['nullable', Rule::in(['month', 'year'])],
        ]);

        DB::transaction(function () use ($validated) {
            $today = date('Y-m-d');

            CompanyPlan::where('companyID', $validated['companyID'])
                ->where(function($query) use ($today) {
                    $query->whereNull('end_date')
                          ->orWhere('end_date', '>=', $today);
                })
                ->update(['end_date' => date('Y-m-d', strtotime('-1 day'))]);

            CompanyPlan::create($validated);
        });

        return response()->json(['message' => 'Company plan added and old plans closed'], 201);
    }

    public function byCompany($companyID)
    {
        $plans = CompanyPlan::with(['plan', 'company'])
            ->where('companyID', $companyID)
            ->orderBy('start_date', 'desc')
            ->get();
        return response()->json($plans);
    }

    public function active($companyID)
    {
        $today = date('Y-m-d');
        $plan = CompanyPlan::with('plan')
            ->where('companyID', $companyID)
            ->where('start_date', '<=', $today)
            ->where(function($query) use ($today) {
                $query->whereNull('end_date')->orWhere('end_date', '>=', $today);
            })
            ->orderBy('start_date', 'desc')
            ->first();
        return response()->json($plan);
    }

    public function show($id)
    {
        $plan = CompanyPlan::with(['company', 'plan'])->findOrFail($id);
        return response()->json($plan);
    }


    public function update(Request $request, $id)
    {
        $plan = CompanyPlan::findOrFail($id);

        $validated = $request->validate([
            'Name' => 'nullable|string|max:255',
            'Description' => 'nullable|string',
            'start_date' => 'nullable|date',
            'end_date' => 'nullable|date|after_or_equal:start_date',
            'price' => 'nullable|numeric|min:0',
            'discount' => 'nullable|numeric|min:0',
            'finalprice' => 'nullable|numeric|min:0',
            'monthyear' => ['nullable', Rule::in(['month', 'year'])],
        ]);

        $plan->update($validated);

        return response()->json(['message' => 'Company plan updated']);
    }

    public function destroy($id)
    {
        $plan = CompanyPlan::findOrFail($id);
        $plan->delete();

        return response()->json(['message' => 'Company plan deleted']);
    }

    public function report(Request $request, $companyID)
    {
        $today = date('Y-m-d');

            $plans = CompanyPlan::with(['plan', 'company'])
            ->where('companyID', $companyID)
            ->orderBy('start_date', 'desc')
            ->get()
            ->map(function ($p) use ($today) {
                $p->isActive = (!$p->end_date || $p->end_date >= $today) && $p->start_date <= $today;
                return $p;
            });

        $activePlans = $plans->where('isActive', true);
        $historyPlans = $plans->where('isActive', false);

        return response()->json([
            'activePlans' => $activePlans->values(),
            'historyPlans' => $historyPlans->values(),
        ]);
    }
}
