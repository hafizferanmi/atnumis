@component('mail::message')


<h3 style="text-align: center;"> ATNUMIS | Bid confirmation </h3>


Dear <b>{{ $username  }}</b>,



@component('mail::panel')

Thank you very much for your bid of USD 00.00 on lot  in ATNUMIS Web Auction .

Should you get outbid on this lot, you will receive an email notification. Please note, 
however, that you may be outbid at any time before the closing time of the lot. You 
may check your currents bids at any given time in your My ATNUMIS account.


We wish you good luck with your bids.





@endcomponent

Kind regards,<br />

ATNUMIS


@endcomponent