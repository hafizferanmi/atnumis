<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Session;
use DB;
use Carbon\Carbon;
use App\Mail\Welcome;
use Validator;
use App\ResetUserPassword;
use App\Mail\ResetPassword;

class UserController extends Controller
{

 public function myProfile(Request $req){

    $user = User::where('username', $req->username)->first();
    // $user = User::select(['name', 'username'])->where('username', 'afisii')->first();
    return response()->json(returnJson(false, 'Profile Details', $user ));
  }


  
  public function login(Request $request){

      $this->validate($request, [
            'username' => 'required',
            'password' => 'required'
        ]);

      $username = $request['username'];
      $form_password = $request['password'];

      // dd($username);

        $user = DB::table('users')
                ->where('username', $username)
                    ->first();

         // dd($user);
        if ($user == '') {
          return response()->json(returnJson(true, 'An error Occured, Try again later'));
        }

        $db_password = $user->password;

        $password_match = password_verify($form_password, $db_password);

        if ($password_match) {
          $t1 = md5(rand());
          $t2 = sha1(rand());
          $t3 = md5(rand());
          $token = $t1.$t3 . '.' . $t2.$t3.$t1 . '.' . $t3.$t2;

          $user = User::find($user->id);
          $user->login_token = $token;
          if($user->save()){
            $data = ['username' => $username, 'email' => $user->email, 'token' => $token];
            return response()->json(returnJson(false, 'Logged in, successful', $data ));
          }else{
            return response()->json(returnJson(true, 'NotLogged in, Unsuccessful' ));
          } 
            
        }else{
          return response()->json(returnJson(true, 'NotLogged in, Unsuccessful' ));
        }


   }

   public function logout(){
   		Session::flush();
   		return redirect('/');
   }



   public function register(Request $request){

      $validator = Validator::make($request->all(), [
            'username' => 'required | unique:users',
            'password' => 'required',
            'email' => 'required | email | unique:users',
            'credit_limit' => 'nullable',
            'references' => 'nullable',
            'company' => 'nullable',
            'firstname' => 'required',
            'lastname' => 'required',
            'address1' => 'required',
            'address2' => 'nullable',
            'zip' => 'required | numeric',
            'city' => 'required',
            'state' => 'nullable',
            'country' => 'required',
            'phone' => 'required',
            'collecting_interest' => 'nullable'
        ]);

      if ($validator->fails()) {
          $errorResponse = $validator->messages();
          return response()->json(returnJson(true, $errorResponse));
      }

      $user = new User();
      $user->username = $request->username;
      $user->email = $request->email;
      $user->password = $request->password;
      $user->credit_limit = $request->credit_limit || 3500;
      $user->references = $request->references;
      $user->company = $request->company;
      $user->name = $request->firstname . ' ' . $request->lastname;
      $user->street = $request->address1;
      $user->street2 = $request->address2;
      $user->zip = $request->zip;
      $user->city = $request->city;
      $user->state = $request->state;
      $user->country = $request->country;
      $user->phone = $request->phone;
      $user->collecting_interest = $request->collecting_interest;
      $user->role = 100;

      if($request->isBillingDifferent){
        $user->shipping_address1 = $request->billingAddress1;
          $user->shipping_address2 = $request->billingAddress2;
          $user->shipping_city = $request->billingAddressCity;
          $user->shipping_country = $request->billingAddressCountry;
          $user->shipping_zipcode = $request->billlingAddressZip;
      }else{
          $user->shipping_address1 = $request->address1;
          $user->shipping_address2 = $request->address2;
          $user->shipping_city = $request->city;
          $user->shipping_country = $request->country;
          $user->shipping_zipcode = $request->zip;
      }
     
      


      if ($user->save()) {
          return response()->json(returnJson(false, 'Registration successful' ));
      }else{
          return response()->json(returnJson(true, 'Error Occured' ));

      }

   }

  public function updateProfile(Request $request){

      $validator = Validator::make($request->all(), [
            'company' => 'required',
            'firstname' => 'required',
            'lastname' => 'required',
            'address1' => 'required',
            'address2' => 'nullable',
            'zip' => 'required | numeric',
            'city' => 'required',
            'state' => 'required',
            'country' => 'required',
            'phone' => 'required',
            'username' => 'required'
        ]);

      if ($validator->fails()) {
          $errorResponse = $validator->messages();
          return response()->json(returnJson(true, $errorResponse));
      }

      $user = User::whereUsername($request->username)->first();
      $user->company = $request->company;
      $user->name = $request->firstname . ' ' . $request->lastname;
      $user->street = $request->address1;
      $user->street2 = $request->address2;
      $user->zip = $request->zip;
      $user->city = $request->city;
      $user->state = $request->state;
      $user->country = $request->country;
      $user->phone = $request->phone;
      $user->role = 100;
      $user->shipping_state = '';
      $user->shipping_country = '';
      $user->shipping_address1 = '';
      $user->shipping_address2 = '';


      if ($user->save()) {
          return response()->json(returnJson(false, 'Profile Update successful' ));
      }else{
          return response()->json(returnJson(true, 'Error Occured' ));

      }

   }

  public function forgotPassword(Request $request){

      $validator = Validator::make($request->all(), [
          'email' => 'required | email',
      ]);

      if ($validator->fails()) {
          $errorResponse = $validator->messages();
          return response()->json(returnJson(true, $errorResponse));
      }

      $token = md5(rand());

       $resetPassword = new ResetUserPassword;
       $resetPassword->email = $request->email;
       $resetPassword->token = $token;

       $details = ['token' => $token, 'email' => $request->email];


      $mailSent = \Mail::to($request->email)->send(new ResetUserPasswordMail($details));
      $tokenSaved =  ResetUserPassword::create(['email' => $request->email, 'token' => $token]);
      // if ($tokenSaved) {
      //   print 'hello';
      // }

      // dd($mailSent);

      if ($tokenSaved) {
        return response()->json(returnJson(true, 'You can now reset your password.'));
          
      }else{
        return response()->json(returnJson(false, 'Error Occured.'));
      }
   }


   public function resetPassword(Request $request){

      $validator = Validator::make($request->all(),[
          'email' => 'required | email',
          'password' => 'required | same:password2',
          '_mail_token' => 'required'
      ]);

      if ($validator->fails()) {
          $errorResponse = $validator->messages();
          return response()->json(returnJson(true, $errorResponse));
      }

       // dd($request->all());

      $userResetPasswordDetails = ResetUserPassword::whereEmail($request->email)->first();
      // dd($userResetPasswordDetails);
      if (!$userResetPasswordDetails->token == $request->_mail_token) {
            return response()->json(returnJson(true, 'Error Occured, Check your mail and try again.'));

      }else{
          $user = User::where('email', $request->email)->first();
          if(!$user){
            return response()->json(returnJson(true, 'Error occured!, Check your mail and try again.'));
          }
          $userResetPasswordDetails->delete();
          $user->password = $request->password;

          if ($user->save()) {
            return response()->json(returnJson(false, 'You can now login.'));
          }else{
            return response()->json(returnJson(true, 'Error occured!, Check your mail and try again.'));

          }

      }

   }


  public function changePassword(Request $request){

      $old = $request->old_password;
      $new = $request->new_password;
      // $confirm = $request->confirm_password;
      $username = $request->username;

      if (!isset($old) || !isset($new) ) {
        return response()->json(returnJson(true, 'Invalid field' ));
      }

      $user = User::whereUsername($username)->first();
      $password = $user->password;
      

      if (!password_verify($old, $password)) {
        return response()->json(returnJson(true, 'Your password deos not match your current password.' ));
      }else{
        $user->password = $request->new_password;
        if ($user->save()) {
          return response()->json(returnJson(false, 'Your password has been changed successfully.' ));
        }else{
           return response()->json(returnJson(true, 'Error Occured. Try again later.' ));
        }
      }


   }

   public function changeEmail(Request $request){
      $email = $request->new_email;
      $username = $request->username;

      if (!isset($email) || !isset($username)) {
          return response()->json(returnJson(true, 'Invalid field' ));
      }

      $emailExist = User::whereEmail($email)->count();
      if ($emailExist > 0) {
          return response()->json(returnJson(true, 'Email already exist.' ));
      }

      $user = User::whereUsername($username)->first();
      $user->email = $email;

      if ($user->save()) {
          return response()->json(returnJson(false, 'Your Email has been changed successfully.' ));
        }else{
           return response()->json(returnJson(true, 'Error Occured. Try again later.' ));
        }


   }

   public function contactUs(Request $request){
      
   }

   public function testMail(Request $req){
      $details = ['link' => 'sometextastoken', 'email' => 'a@gmail.com', 'username' => 'protocall'];
      $mailSent = \Mail::to('hafizferanmi@gmail.com')->send(new ResetPassword($details));
      if ($mailSent) {
        print 'auction';
      }else{
        print 'billingAddress1';
      }
   }

}
