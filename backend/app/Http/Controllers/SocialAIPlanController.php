<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\SocialAIPlan;

class SocialAIPlanController extends Controller
{
    public function index(Request $request)
    {
        $query = SocialAIPlan::query();

        // Filtering
        if ($request->filled('Name')) {
            $query->where('Name', 'like', '%' . $request->Name . '%');
        }

        // Sorting
        if ($request->filled('sortBy') && $request->filled('sortOrder')) {
            $query->orderBy($request->sortBy, $request->sortOrder);
        } else {
            $query->orderBy('ID', 'asc');
        }

        return response()->json($query->paginate(10));
    }

    public function store(Request $request)
    {
        $request->validate([
            'Name' => 'required|string|unique:ms_socialaiplans,Name',
            'allowsocialaccounts' => 'nullable|integer',
            'allowpostspermonth' => 'nullable|integer',
            'allowswitchboardtemplates' => 'nullable|integer',
            'allowinstcarousels' => 'nullable|integer',
            'allowcreatomatevideospermonth' => 'nullable|integer',
            'allowxxx' => 'nullable|integer',
            'initialpricemonth' => 'nullable|numeric',
            'initialpricediscount' => 'nullable|numeric',
        ]);

        $plan = SocialAIPlan::create($request->all());
        return response()->json($plan, 201);
    }

    public function show($id)
    {
        $plan = SocialAIPlan::findOrFail($id);
        return response()->json($plan);
    }

    public function update(Request $request, $id)
    {
        $plan = SocialAIPlan::findOrFail($id);

        $request->validate([
            'Name' => 'required|string|unique:ms_socialaiplans,Name,' . $id . ',ID',
            'allowsocialaccounts' => 'nullable|integer',
            'allowpostspermonth' => 'nullable|integer',
            'allowswitchboardtemplates' => 'nullable|integer',
            'allowinstcarousels' => 'nullable|integer',
            'allowcreatomatevideospermonth' => 'nullable|integer',
            'allowxxx' => 'nullable|integer',
            'initialpricemonth' => 'nullable|numeric',
            'initialpricediscount' => 'nullable|numeric',
        ]);

        $plan->update($request->all());
        return response()->json($plan);
    }

    public function destroy($id)
    {
        $plan = SocialAIPlan::findOrFail($id);
        $plan->delete();

        return response()->json(['message' => 'Plan deleted successfully.']);
    }
}
