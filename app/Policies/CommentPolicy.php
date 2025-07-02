<?php

namespace App\Policies;

use App\Models\Comment;
use App\Models\User;

class CommentPolicy
{
    public function delete(User $user, Comment $comment)
    {
        return $user->is_admin || $user->id === $comment->user_id;
    }
}
