<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class RegistrationConrtoller extends Controller
{
    public function create()
    {
        return inertia('Registration/Registartion');
    }

    public function store(Request $request)
    {
        //
    }
}
