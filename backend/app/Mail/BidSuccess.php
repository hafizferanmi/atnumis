<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Queue\ShouldQueue;

class BidSuccess extends Mailable
{
    use Queueable, SerializesModels;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($details)
    {
        $this->details = $details;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        // $address = 'orders@ateeqa.com';
        // $name = 'Boda Afisi at Ateeqa';
        // $subject = 'Login notification.';
        // return $this->view('email.welcome')
        //     ->from($address, $name)
        //     ->subject($subject);


        return $this->from('info@atnumis.com', 'Boda Afisi')
            ->subject('Bis successful')
            ->markdown('email.bid_success')
            ->with($this->details);
    }
}
