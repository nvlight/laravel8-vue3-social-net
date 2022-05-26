<?php

namespace App\Models;

use App\Traits\HasPermissions;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Role extends Model
{
    //use HasFactory;
    use HasPermissions;

    public function permissions(){
        return $this->belongsToMany(Permission::class, 'roles_permissions');
    }

    public function hasPermissionTo(...$permissions)
    {
        return $this->permissions()->whereIn('slub', $permissions)->count();
    }


}
