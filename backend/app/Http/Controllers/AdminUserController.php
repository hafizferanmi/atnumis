<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\User;
use App\Admin;
use Session;
use DB;

class AdminUserController extends Controller
{
    private $roles = [
        ['roleId' => 1000, 'title' => 'Adminstrator'],
        ['roleId' => 100, 'title' => 'Manager'],
        ['roleId' => 10, 'title' => 'Accountant']
    ];


    public function showAllUsers(Request $req){
    	$users = User::whereRole(100)->get();
    	return view('coin.dashboard.show_all_users', compact('users'));
    }

    public function showUserWithId($id){
    	$user = User::findOrFail($id);
    	return view('coin.dashboard.show_user_with_id', compact('user'));

    }

    public function showEditUserWithId($id){
    	$user = User::findOrFail($id); 
    	return view('coin.dashboard.show_user_with_id_form', compact('user'));
    }

    public function editUser(Request $request){
    	$user = User::findOrFail($request->id);
		$user->name = $request->name;
		$user->email = $request->email;
		$user->company = $request->company;
		$user->street = $request->street;
		$user->street2 = $request->street2;
		$user->zip = $request->zip;
		$user->city = $request->city;
		$user->state = $request->state;
		$user->country = $request->country;
		$user->phone = $request->phone;
		$user->shipping_address1 = $request->shipping_address1;
		$user->shipping_address2 = $request->shipping_address2;
		$user->shipping_city = $request->shipping_city;
		$user->shipping_country = $request->shipping_country;
		$user->shipping_zipcode = $request->shipping_zipcode;

		if ($user->save()) {
			Session::flash('flash', 'User details changed successfully');
		 	return redirect()->back();
		 } 
    }

    public function deleteUserWithId($id){
    	$user = User::findOrFail($id);
    	$user->delete();
    	return redirect('/users/all');
    }

    public function blockUser($id){
        $user = User::findOrFail($id);
        $user->active = false;
        Session::flash('flash', 'User restricted successfully');
        return redirect()->back();
    }


    public function unblockUser($id){
        $user = User::findOrFail($id);
        $user->active = true;
        Session::flash('flash', 'User Unrestricted successfully');
        return redirect()->back();
    }


    public function showAdminUsers(Request $req){
    	$users = Admin::all();
    	return view('coin.dashboard.show_all_admin_users', compact('users'));
    }

    public function addAdminUser(Request $req){
        $this->validate($req, [
            'username' => 'required | unique:admin',
            'password' => 'required',
            'role' => 'required',
            'email' => 'email | required | unique:admin',
            'phone' => 'numeric',
            'name' => 'required'
      ]);

        switch ($req->role) {
            case 1000:
                $title = 'Adminstrator';
                break;
            case 100:
                $title = 'Manager';
                break;
            case 10:
                $title = 'Accountant';
                break;
            default:
                $title = 'Accountant';
                break;
        }

    	$admin = new Admin();
        $admin->username = $req->username;
        $admin->password = $req->password;
        $admin->role = $req->role;
        $admin->title = $title;
        $admin->email = $req->email;
        $admin->phone = $req->phone;
        $admin->name = $req->name;

        // $admin-> = $req->;
        if ($admin->save()) {
            Session::flash('flash', 'Admin user has been added successfully');
            return redirect()->back();
        }else{
            Session::flash('flash', 'Error Occured, try again later');
            return redirect()->back();
        }
        
    }

    public function showAdminDetails($id){
        $admin = Admin::findOrFail($id);
        return view('coin.dashboard.show_admin_user_with_id', compact('admin'));
    }

    public function editAdminRole(Request $req){
        $this->validate($req, [
            '_id' => 'required',
            'role' => 'required',
      ]);

        switch ($req->role) {
            case 1000:
                $title = 'Adminstrator';
                break;
            case 100:
                $title = 'Manager';
                break;
            case 10:
                $title = 'Accountant';
                break;
            default:
                $title = 'Accountant';
                break;
        }

        $admin = Admin::findOrFail($req->_id);
        $admin->role = $req->role;
        $admin->title = $title;

        if($admin->save()){
            return redirect()->back();
        }
        // if ($admin->save()) {
        //     Session::flash('flash', 'Role changed successfully');
        //     return redirect('users/admin/'. $admin->id . '/' . $admin->username);
        // }else{
        //     Session::flash('flash', 'Error Occured, try again.');
        //     return redirect('users/admin/'. $admin->id . '/' . $admin->username);
        // }
    }

    public function deleteAdminUser(Request $req){

    }

    public function updateAdminUserProfile(Request $req){

    }


    public function adminLogin(Request $request){

        $this->validate($request, [
            'username' => 'required',
            'password' => 'required'
      ]);

        $username = $request['username'];
        $form_password = $request['password'];

        // dd($username);

        $admin = DB::table('admin')
                    ->where('username', $username)
                    ->orWhere('email', $username)
                            ->first();

         // dd($user);
        if ($admin == '') {
            Session::flash('flash', 'Invalid username/password combination');
            return redirect()->route('admin.login');
        }

        $db_password = $admin->password;

        $password_match = password_verify($form_password, $db_password);

        if ($password_match) {
            Session::put('admin_logged_in', true);
            Session::put('admin_role', $admin->role);
            Session::put('admin_id', $admin->id);
            Session::put('admin_dp', $admin->image);
            Session::put('admin_name', $admin->name);
            Session::put('admin_username', $admin->username);
            Session::put('admin_email', $admin->email);
            return redirect('/');
        }else{
            Session::flash('flash', 'Invalid username/password combination');
            return redirect()->route('admin.login');
        }


   }

   public function showAdminSettings(){
    $admin = Admin::findOrFail(Session::get('admin_id'));
    return view('coin.dashboard.settings', compact('admin'));
   }

   public function adminUpdateDetails(Request $req){
        $this->validate($req, [
            // 'email' => 'email | required | unique:admin',
            'phone' => 'numeric',
            'name' => 'required'
        ]);

        $admin = Admin::findOrFail(Session::get('admin_id'));
        // $admin->email = $req->email;
        $admin->phone = $req->phone;
        $admin->name = $req->name;
        $admin->country = $req->country;
        if ($admin->save()) {
            Session::flash('flash', 'Setting updated successfully');
            return redirect()->back();
        }else{
            Session::flash('flash', 'Error Occured, try again later');
            return redirect()->back();
        }
   }

   public function adminUpdatePassword(Request $req){
        // dd($req);
        $this->validate($req, [
            'password' => 'required | same:password2'
        ]);

        $admin = Admin::findOrFail(Session::get('admin_id'));
        // $admin->email = $req->email;
        $admin->password = $req->password;
        if ($admin->save()) {
            Session::flash('flash', 'Password updated successfully');
            return redirect()->back();
        }else{
            Session::flash('flash', 'Error Occured, try again later');
            return redirect()->back();
        }

   }

   public function adminUpdateDp(Request $req){
        // dd($req);
        $uploadedFile = $req->file('image');
        $extension = $uploadedFile->getClientOriginalExtension();
        $filename  = 'dp-' . Session::get('admin_username') . time() . '.' . $extension;
        $path = $uploadedFile->storeAs('public/dp', $filename);

        $admin = Admin::findOrFail(Session::get('admin_id'));
        // $admin->email = $req->email;
        $admin->image = $filename;
        if ($admin->save()) {
            Session::flash('flash', 'Picture updated successfully');
            return redirect()->back();
        }else{
            Session::flash('flash', 'Error Occured, try again later');
            return redirect()->back();
        }
   }

   public function adminUpdateEmail(Request $req){
        // dd($req);
        $this->validate($req, [
            'email' => 'required'
        ]);

         $admin = Admin::findOrFail(Session::get('admin_id'));
        $admin->email = $req->email;
        if ($admin->save()) {
            Session::flash('flash', 'Email updated successfully');
            return redirect()->back();
        }else{
            Session::flash('flash', 'Error Occured, try again later');
            return redirect()->back();
        }

   }


    public function logout(){
      Session::flush();
      return redirect()->route('admin.login');
   }

}
