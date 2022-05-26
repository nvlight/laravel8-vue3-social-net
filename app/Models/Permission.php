<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Traits\HasPermissions;

class Permission extends Model
{
    //use HasFactory;
    use HasPermissions;

    public function roles(){
        return $this->belongsToMany(Role::class, 'roles_permissions');
    }
}
