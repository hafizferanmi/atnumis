@component('mail::message')

<h3 style="text-align: center;"> Password Reset </h3>

Dear <b>{{ $username  }}</b>,



@component('mail::panel')

A request has been made to reset your ATNUMIS account password. <br />

Email/Username: {{ $email }} <br />

To reset your password, you will need to click the button below in order to verify that 
the request was legitimate

@component('mail::button', ['url' => $link])

Click here to reset your password <br/>

@endcomponent 



@endcomponent

ATNUMIS


@endcomponent