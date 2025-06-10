<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Slider;
use Illuminate\Http\Request;

class SliderController extends Controller
{
    public function index()
    {
        return inertia('Admin/Slider', [
            'slides' => Slider::orderBy('order', 'asc')->paginate(20),
        ]);
    }

    public function store(Request $request)
    {
        //
    }

    public function update(Request $request, Slider $slider)
    {
        //
    }

    public function destroy(Slider $slider)
    {
        //
    }
}
