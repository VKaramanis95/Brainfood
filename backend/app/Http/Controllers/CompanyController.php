<?php
namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Company;
use Illuminate\Http\Request;

class CompanyController extends Controller
{
    public function index(Request $request)
{
    $query = Company::query();

    // Filtering
    if ($request->filled('VAT')) {
        $query->where('VAT', 'like', '%' . $request->VAT . '%');
    }

    if ($request->filled('Name')) {
        $query->where('Name', 'like', '%' . $request->Name . '%');
    }

    // Sorting
    if ($request->filled('sortBy') && $request->filled('sortOrder')) {
        $query->orderBy($request->sortBy, $request->sortOrder);
    }

    return $query->paginate(10);
}


    public function store(Request $request)
    {
        $request->validate([
            'Name' => 'required|string|max:255',
            'VAT' => 'nullable|string|unique:ms_company,VAT',
        ]);

        $company = Company::create($request->all());
        return response()->json($company, 201);
    }

    public function show($id)
    {
        return Company::findOrFail($id);
    }

    public function update(Request $request, $id)
    {
        $company = Company::findOrFail($id);

        $request->validate([
            'VAT' => 'nullable|string|unique:ms_company,VAT,' . $id . ',ID',
        ]);

        $company->update($request->all());
        return response()->json($company);
    }

    public function destroy($id)
    {
        $company = Company::findOrFail($id);
        $company->delete();
        return response()->json(['message' => 'Deleted']);
    }
}
