@component('mail::message')


<h3 style="text-align: center;"> Welcome </h3>

Dear <b>{{ $username  }}</b>,

Thank you for registering with ATNUMIS

You will now be able to access your account by using the email and password you signed up 
with. You May now have following features access



@component('mail::panel')

Thank you for registering with ATNUMIS

You will now be able to access your account by using the email and password you signed up 
with. You May now have following features access


Bid in our Sales 
Create a watchlist
Follow your Current bids
Consign coins 
Manage your consignments
Buy or Sale Now
Valuation <br/>


If you have any question or require further assistance. Please feel free to reach our customer 
care and technical support at support@atnumis.com

Kind regards, 

ATNUMIS


Take Me Back <br/>

@endcomponent

{{-- @component('mail::button', ['url' => $link])

Take Me Back <br/>

@endcomponent --}}

Regards,<br />
Boda Afisi.

@endcomponent