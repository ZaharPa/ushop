<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{

    public function index()
    {
        return inertia('Admin/User', [
            'users' => User::latest()->paginate(10, ['*'], 'active_users_page'),
            'deletedUsers' => User::onlyTrashed()->latest()->paginate(5, ['*'], 'deleted_users_page'),
        ]);
    }

    public function update(Request $request, User $user)
    {
        $request->validate([
            'name' => 'required|string',
        ]);

        $user->update([
            'name' => $request->name,
        ]);

        return redirect()->route('admin.user.index')
            ->with('success', 'User updated successfully');
    }

    public function destroy(User $user)
    {
        $user->deleteOrFail();

        return redirect()->back()
            ->with('success', 'User was deleted');
    }

    public function restore(User $user)
    {
        $user->restore();

        return redirect()->back()
            ->with('success', 'User was restored');
    }
}
