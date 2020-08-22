@extends('coin.dashboard.master')
@section('content')
<!-- page content -->
<div class="right_col" role="main">
    <form method="post" action="{{ route('dashboard.coin.add.auction.post') }}" id="theForm" class="form-horizontal form-label-left" enctype="multipart/form-data">
        {{ csrf_field() }}
        <link rel="stylesheet" type="text/css" href="{{ asset('vendors/slick/slick.css') }}" />
        <script type="text/javascript" src="{{ asset('vendors/slick/slick.min.js') }}"></script>
        <div style="margin-top: 70px;">
            @if( Session::has('flash') )
            <div class="alert alert-info">
                {{ Session::get('flash') }}
            </div>
            @endif
        </div>
        <div id="ctl00_upDefault">
            <div class="row">
                <div class="col-sm-7 col-xs-12">
                    <!-- Left column panels -->
                    <div class="x_panel">
                        <div class="x_title">
                            <h2>Add Auction Coin <small></small> </h2>
                            <ul class="nav navbar-right panel_toolbox">
                                <li><a class="collapse-link"><i class="fa fa-chevron-up"></i></a>
                                </li>
                            </ul>
                            <div class="clearfix"></div>
                        </div>
                        <div class="x_content" id="x_c_inventory">
                            <div class="form-group">
                                <label class="control-label col-md-3 col-sm-3 col-xs-12">Auction Name</label>
                                <div class="col-md-9 col-sm-9 col-xs-12">
                                    <select disabled="" name="auction_type" onchange="" id="ddlCategory" class="select2_single form-control">
                                        <option value="{{ $auction->id }}"> {{ $auction->type }} </option>
                                    </select>
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="control-label col-md-3 col-sm-3 col-xs-12">Category:</label>
                                <div class="col-md-9 col-sm-9 col-xs-12">
                                    <select name="ddlCategory" onchange="fetchCountry(this.value)" id="ddlCategory" class="select2_single form-control">
                                        <option value="">Select a Category...</option>
                                        <option value="Greek">Greek</option>
                                        <option value="Oriental Greek">Oriental Greek</option>
                                        <option value="Central Asian">Central Asian</option>
                                        <option value="Roman Provincial">Roman Provincial</option>
                                        <option value="Roman Republican & Imperatorial">Roman Republican &amp; Imperatorial</option>
                                        <option value="Roman Imperial">Roman Imperial</option>
                                        <option value="Byzantine">Byzantine</option>
                                        <option value="Early Medieval & Islamic">Early Medieval & Islamic</option>
                                        <option value="World">World</option>
                                        <option value="Miscellaneous">Miscellaneous</option>
                                        <option value="Group Lots">Group Lots</option>
                                        <option value="n/a">n/a</option>
                                    </select>
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="control-label col-md-3 col-sm-3 col-xs-12">Country:</label>
                                <div class="col-md-9 col-sm-9 col-xs-12">
                                    <select name="ddlCountry" onchange="fetchRegion(this.value)" id="ddlCountry" class="select2_single form-control">
                                        <option value="">Select a Country...</option>
                                        
                                    </select>
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="control-label col-md-3 col-sm-3 col-xs-12">Region:</label>
                                <div class="col-md-9 col-sm-9 col-xs-12">
                                    <select name="ddlRegion" onchange="fetchCity(this.value)" id="ddlRegion" class="select2_single form-control">
                                        <option value="">Select a Region...</option>
                                    </select>
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="control-label col-md-3 col-sm-3 col-xs-12">City:</label>
                                <div class="col-md-7 col-sm-7 col-xs-12">
                                    <select name="ddlCity" onchange="fetchRuler(this.value)" id="ddlCity" class="select2_single form-control">
                                        <option value="">Select a City...</option>
                                        {{-- <option value="n/a">n/a</option> --}}
                                    </select>
                                </div>
                                <div class="checkbox col-md-2 col-sm-2 col-xs-12">
                                    <label>
                                        <div class="icheckbox_flat-green" style="position: relative;">
                                            <input name="cbQuestionCity" type="checkbox" id="cbQuestionCity" class="flat" style="position: absolute; opacity: 0;" />
                                            <ins class="iCheck-helper" style="position: absolute; top: 0%; left: 0%; display: block; width: 100%; height: 100%; margin: 0px; padding: 0px; background: rgb(255, 255, 255) none repeat scroll 0% 0%; border: 0px none; opacity: 0;"></ins>
                                        </div>
                                        (?)
                                    </label>
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="control-label col-md-3 col-sm-3 col-xs-12">Ruler:</label>
                                <div class="col-md-7 col-sm-7 col-xs-12">
                                    <select name="ddlRuler" onchange="fetchDate(this.value)" id="ddlRuler" class="select2_single form-control">
                                        <option value="">Select a Ruler...</option>
                                       
                                    </select>
                                </div>
                                <div class="checkbox col-md-2 col-sm-2 col-xs-12">
                                    <label>
                                        <div class="icheckbox_flat-green" style="position: relative;">
                                            <input name="cbQuestionRuler" type="checkbox" id="cbQuestionRuler" class="flat" style="position: absolute; opacity: 0;" />
                                            <ins class="iCheck-helper" style="position: absolute; top: 0%; left: 0%; display: block; width: 100%; height: 100%; margin: 0px; padding: 0px; background: rgb(255, 255, 255) none repeat scroll 0% 0%; border: 0px none; opacity: 0;"></ins>
                                        </div>
                                        (?)
                                    </label>
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="control-label col-md-3 col-sm-3 col-xs-12">Date:</label>
                                <div class="col-md-9 col-sm-9 col-xs-12">
                                    <input name="txtDate" type="text" value="" id="txtDate" class="form-control" placeholder="Date" />
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="control-label col-md-3 col-sm-3 col-xs-12">Denomination:</label>
                                <div class="col-md-5 col-sm-5 col-xs-12">
                                    <select name="ddlDenomination" id="ddlDenomination" class="select2_single form-control">
                                        <option value="">Select denomination</option>
                                        <option value="AE">AE</option>
                                        <option value="Aes Grave">Aes Grave</option>
                                        <option value="Aes Rude">Aes Rude</option>
                                        <option value="Antoninianus">Antoninianus</option>
                                        <option value="Argenteus">Argenteus</option>
                                        <option value="As">As</option>
                                        <option value="Assarion">Assarion</option>
                                        <option value="Aureus">Aureus</option>
                                        <option value="Chalkous">Chalkous</option>
                                        <option value="Cistophorus">Cistophorus</option>
                                        <option value="Daric">Daric</option>
                                        <option value="Daric">Dekadrachm</option>
                                        <option value="Denarius">Denarius</option>
                                        <option value="Diassarion">Diassarion</option>
                                        <option value="Dichalkon">Dichalkon</option>
                                        <option value="Didrachm">Didrachm</option>
                                        <option value="Dilitron">Dilitron</option>
                                        <option value="Diobol">Diobol</option>
                                        <option value="Dishekel">Dishekel</option>
                                        <option value="Distater">Distater</option>
                                        <option value="Double Sestertius">Double Sestertius</option>
                                        <option value="Double Siglos">Double Siglos</option>
                                        <option value="Drachm">Drachm</option>
                                        <option value="Ducat">Ducat</option>
                                        <option value="Dupondius">Dupondius</option>
                                        <option value="Follis">Follis</option>
                                        <option value="Half Shekel">Half Shekel</option>
                                        <option value="Half Stater">Half Stater</option>
                                        <option value="Heavy Miliarense">Heavy Miliarense</option>
                                        <option value="Hekte">Hekte</option>
                                        <option value="Hemiassarion">Hemiassarion</option>
                                        <option value="Hemidrachm">Hemidrachm</option>
                                        <option value="Hemihekte – 1/12 Stater">Hemihekte – 1/12 Stater</option>
                                        <option value="Hemilitron">Hemilitron</option>
                                        <option value="Hemiobol">Hemiobol</option>
                                        <option value="Hexas">Hexas</option>
                                        <option value="Large Bronze">Large Bronze</option>
                                        <option value="Light Miliarense">Light Miliarense</option>
                                        <option value="Litra">Litra</option>
                                        <option value="Medal">Medal</option>
                                        <option value="Medallion">Medallion</option>
                                        <option value="Middle Bronze">Middle Bronze</option>
                                        <option value="Nomos">Nomos</option>
                                        <option value="Obol">Obol</option>
                                        <option value="Octobol">Octobol</option>
                                        <option value="Octodrachm">Octodrachm</option>
                                        <option value="Oktadrachm">Oktadrachm</option>
                                        <option value="Oktassarion">Oktassarion</option>
                                        <option value="Penny">Penny</option>
                                        <option value="Pentadrachm">Pentadrachm</option>
                                        <option value="Pentassarion">Pentassarion</option>
                                        <option value="Quadrans">Quadrans</option>
                                        <option value="Quarter Stater">Quarter Stater</option>
                                        <option value="Quinarius">Quinarius</option>
                                        <option value="Semis">Semis</option>
                                        <option value="Semissis">Semissis</option>
                                        <option value="Semuncia">Semuncia</option>
                                        <option value="Sestertius">Sestertius</option>
                                        <option value="Sextans">Sextans</option>
                                        <option value="Shekel">Shekel</option>
                                        <option value="Siglos">Siglos</option>
                                        <option value="Siliqua">Siliqua</option>
                                        <option value="Small Bronze">Small Bronze</option>
                                        <option value="Solidus">Solidus</option>
                                        <option value="Stater">Stater</option>
                                        <option value="Tetrachalkon">Tetrachalkon</option>
                                        <option value="Tetradrachm">Tetradrachm</option>
                                        <option value="Tetras">Tetras</option>
                                        <option value="Tetrassarion">Tetrassarion</option>
                                        <option value="Tetrobol">Tetrobol</option>
                                        <option value="Trachy Nomisma">Trachy Nomisma</option>
                                        <option value="Tremissis">Tremissis</option>
                                        <option value="Triassarion">Triassarion</option>
                                        <option value="Trichalkon">Trichalkon</option>
                                        <option value="Tridrachm">Tridrachm</option>
                                        <option value="Triens">Triens</option>
                                        <option value="Trihemidrachm">Trihemidrachm</option>
                                        <option value="Trihemiobol">Trihemiobol</option>
                                        <option value="Trihemistater">Trihemistater</option>
                                        <option value="Tritartemorion">Tritartemorion</option>
                                        <option value="1/12 Stater">1/12 Stater</option>
                                        <option value="Uncia">Uncia</option>
                                        <option value="None">None</option>
                                        <option value="Maiorina">Maiorina</option>
                                        <option value="Double Maiorina">Double Maiorina</option>
                                        <option value="Nummus">Nummus</option>
                                        <option value="Centenionalis">Centenionalis</option>
                                        <option value="Double Centenionalis">Double Centenionalis</option>
                                        <option value="1/3 Stater">1/3 Stater</option>
                                        <option value="1/4 Stater">1/4 Stater</option>
                                        <option value="1/8 Stater">1/8 Stater</option>
                                        <option value="Myshemihekte – 1/24 Stater">Myshemihekte – 1/24 Stater</option>
                                        <option value="Binio">Binio</option>
                                        <option value="Unit">Unit</option>
                                        <option value="Trite">Trite</option>
                                        <option value="25 Litrai">25 Litrai</option>
                                        <option value="50 Litrai">50 Litrai</option>
                                        <option value="100 Litrai">100 Litrai</option>
                                        <option value="Quadrigatus - Didrachm">Quadrigatus - Didrachm</option>
                                        <option value="1/4 Follis">1/4 Follis</option>
                                        <option value="Hemitetartemorion">Hemitetartemorion</option>
                                        <option value="Tetartemorion">Tetartemorion</option>
                                        <option value="Dinar">Dinar</option>
                                        <option value="Aspron Trachy">Aspron Trachy</option>
                                        <option value="Trachy">Trachy</option>
                                        <option value="Didrachm or Nomos">Didrachm or Nomos</option>
                                        <option value="1/2 Unit">1/2 Unit</option>
                                        <option value="1/4 Unit">1/4 Unit</option>
                                        <option value="1/48 Stater">1/48 Stater</option>
                                        <option value="1/96 Stater">1/96 Stater</option>
                                        <option value="1/192 Stater">1/192 Stater</option>
                                        <option value="Double Shekel">Double Shekel</option>
                                        <option value="Octassarion">Octassarion</option>
                                        <option value="Tram">Tram </option>
                                        <option value="Miliaresion">Miliaresion </option>
                                        <option value="Yirmilik Cedid Mahmudiye">Yirmilik Cedid Mahmudiye </option>
                                        <option value="60 Litrai or Dekadrachm">60 Litrai or Dekadrachm</option>
                                        <option value="60 Litrai">60 Litrai</option>
                                        <option value="1/4 Siliqua">1/4 Siliqua</option>
                                        <option value="Triobol">Triobol</option>
                                        <option value="Pentobol">Pentobol</option>
                                        <option value="Scyphate Stater">Scyphate Stater</option>
                                        <option value="Cast unit">Cast unit</option>
                                        <option value="Histamenon">Histamenon</option>
                                        <option value="Hyperpyron">Hyperpyron</option>
                                        <option value="Pentanummium">Pentanummium</option>
                                        <option value="Dekanummium">Dekanummium</option>
                                        <option value="3/4 Obol">3/4 Obol</option>
                                        <option value="Hexassarion">Hexassarion</option>
                                        <option value="1/5 Tetradrachm">1/5 Tetradrachm</option>
                                        <option value="Hemilitron or Hexonkion">Hemilitron or Hexonkion</option>
                                        <option value="Bronze">Bronze</option>
                                        <option value="Half Siglos">Half Siglos</option>
                                        <option value="6 Units">6 Units</option>
                                        <option value="12 Units">12 Units</option>
                                        <option value="24 Units">24 Units</option>
                                        <option value="48 Units">48 Units</option>
                                        <option value="10 Assaria">10 Assaria</option>
                                        <option value="1/6 Stater">1/6 Stater</option>
                                        <option value="1/4 Shekel">1/4 Shekel</option>
                                        <option value="1/8 Shekel">1/8 Shekel</option>
                                        <option value="1/12 Shekel">1/12 Shekel</option>
                                        <option value="1/16 Shekel">1/16 Shekel</option>
                                        <option value="1/24 Shekel">1/24 Shekel</option>
                                        <option value="1/32 Shekel">1/32 Shekel</option>
                                        <option value="1/64 Shekel">1/64 Shekel</option>
                                        <option value="Tetarteron">Tetarteron</option>
                                        <option value="1/24 Stater">1/24 Stater</option>
                                        <option value="1/32 Stater">1/32 Stater</option>
                                        <option value="18 Groszy">18 Groszy</option>
                                        <option value="Grosso">Grosso</option>
                                        <option value="Grosh">Grosh</option>
                                        <option value="1/10 Tetradrachm">1/10 Tetradrachm</option>
                                        <option value="1/2 of 3/4 Obol">1/2 of 3/4 Obol</option>
                                        <option value="1/24 Stater">1/24 Stater</option>
                                        <option value="1/4 Quinar">1/4 Quinar</option>
                                        <option value="Denier">Denier</option>
                                        <option value="1/10 Stater">1/10 Stater</option>
                                        <option value="Fals">Fals</option>
                                        <option value="Grosso">Grosso</option>
                                        <option value="Grosh">Grosh</option>
                                        <option value="Basilikon">Basilikon</option>
                                        <option value="1/16 Stater">1/16 Stater</option>
                                        <option value="Tornese">Tornese</option>
                                        <option value="80 Drachmai or Diobol">80 Drachmai or Diobol</option>
                                        <option value="40 Drachmai or Obol">40 Drachmai or Obol</option>
                                        <option value="Miliarense">Miliarense</option>
                                        <option value="1/2 Argenteus">1/2 Argenteus</option>
                                        <option value="Victoriatus">Victoriatus</option>
                                        <option value="Hexagram">Hexagram</option>
                                        <option value="1/4 Drachm">1/4 Drachm</option>
                                        <option value="12 Assaria">12 Assaria</option>
                                        <option value="11 Assaria">11 Assaria</option>
                                        <option value="11 Assaria">Light weight Solidus of 23 Siliquae</option>
                                        <option value="Dirham">Dirham</option>
                                        <option value="Seal">Seal</option>
                                        <option value="Quadrunx">Quadrunx</option>
                                        <option value="1 1/2 Scripula - Nine Siliquae">1 1/2 Scripula - Nine Siliquae</option>
                                        <option value="1/3 Assarion">1/3 Assarion</option>
                                        <option value="Prutah">Prutah</option>
                                        <option value="5 Litrai">5 Litrai</option>
                                        <option value="AE Contorniate">AE Contorniate</option>
                                        <option value="Half Tram">Half Tram</option>
                                        <option value="Stamenon">Stamenon</option>
                                        <option value="Half Tetarteron">Half Tetarteron</option>
                                        <option value="Zeri İstanbul – Fındık">Zeri İstanbul – Fındık</option>
                                        <option value="1/2 Siliqua">1/2 Siliqua</option>
                                        <option value="2/3 Miliaresion">2/3 Miliaresion</option>
                                        <option value="Follaro">Follaro</option>
                                        <option value="1 Uncia">1 Uncia</option>
                                        <option value="40 Nummi">40 Nummi</option>
                                        <option value="250 Nummi - Half Siliqua">250 Nummi - Half Siliqua</option>
                                        <option value="Heavy Dinar">Heavy Dinar</option>
                                        <option value="Cedid Adliye Altını">Cedid Adliye Altını</option>
                                        <option value="Tessera">Tessera</option>
                                        <option value="Weight">Weight</option>
                                        <option value=">Weight of 6 Nomismata">Weight of 6 Nomismata</option>
                                        <option value="Hemichalkon">Hemichalkon</option>
                                        <option value="Weight of 3 Nomismata">Weight of 3 Nomismata</option>
                                        <option value="Onkia">Onkia</option>
                                        <option value="Hexas - Dionkion">Hexas - Dionkion</option>
                                        <option value="Commercial weight">Commercial weight</option>
                                        <option value="Weight of 3 Staters">Weight of 3 Staters</option>
                                        <option value="Half Quadrans">Half Quadrans</option>
                                        <option value="Zecchino">Zecchino</option>
                                        <option value="Double Tram">Double Tram</option>
                                        <option value="AR Unit">AR Unit</option>
                                        <option value="Sultani">Sultani</option>
                                        <option value="Weight of 1 Uncia">Weight of 1 Uncia</option>
                                        <option value="Weight of 2 Unciae or 12 Solidi">Weight of 2 Unciae or 12 Solidi</option>
                                        <option value="Hemilitra">Hemilitra</option>
                                        <option value="9 Assaria">9 Assaria</option>
                                        <option value="Bracteate">Bracteate</option>
                                        <option value="Heavy Aureus">Heavy Aureus</option>
                                        <option value="Coin Die for a Solidus Reverse">Coin Die for a Solidus Reverse</option>
                                        <option value="Octachalkon">Octachalkon</option>
                                        <option value="Dirhem">Dirhem</option>
                                        <option value="Morabitino (180 Dinheiros)">Morabitino (180 Dinheiros)</option>
                                        <option value="Half Stavraton">Half Stavraton</option>
                                        <option value="Gros grand">Gros grand</option>
                                        <option value="Teston">Teston</option>
                                        <option value="Light weight Solidus of 22 Siliquae">Light weight Solidus of 22 Siliquae</option>
                                        <option value="Light weight Solidus of 20 Siliquae">Light weight Solidus of 20 Siliquae</option>
                                        <option value="Light weight Solidus of 21 Siliquae">Light weight Solidus of 21 Siliquae</option>
                                        <option value="Rouble">Rouble</option>
                                        <option value="Kardez">Kardez</option>
                                        <option value="2 Nummi">2 Nummi</option>
                                        <option value="Bulla">Bulla</option>
                                        <option value="Testone">Testone</option>
                                        <option value="Coronato">Coronato</option>
                                        <option value="5 Francs">5 Francs</option>
                                        <option value="50 Centimes">50 Centimes</option>
                                        <option value="1 Mark (16 Skilling)">1 Mark (16 Skilling)</option>
                                        <option value="1/4 Riksdaler">1/4 Riksdaler</option>
                                        <option value="1/8 Riksdaler">1/8 Riksdaler</option>
                                        <option value="1 Batzen">1 Batzen</option>
                                        <option value="Sestino">Sestino</option>
                                        <option value="Carlino">Carlino</option>
                                        <option value="Real">Real</option>
                                        <option value="Half Grosh">Half Grosh</option>
                                        <option value="Giulio">Giulio</option>
                                        <option value="245">2 Lire</option>
                                        <option value="Mezzo Testone">Mezzo Testone</option>
                                        <option value="Fiorino di stella da 12 denari">Fiorino di stella da 12 denari</option>
                                        <option value="Akçe">Akçe</option>
                                        <option value="Trishekel">Trishekel</option>
                                        <option value="Mnaeion or Oktadrachm">Mnaeion or Oktadrachm</option>
                                        <option value="Pogh">Pogh</option>
                                        <option value="Counterfeiter's mold">Counterfeiter's mold</option>
                                        <option value="Trias or Tetronkion">Trias or Tetronkion</option>
                                        <option value="Fındık or Altin">Fındık or Altin</option>
                                        <option value="Cistophoric Drachm">Cistophoric Drachm</option>
                                        <option value="3 Kreuzer">3 Kreuzer</option>
                                        <option value="2 1/2 Scudi">2 1/2 Scudi</option>
                                        <option value="Scudo">Scudo</option>
                                        <option value="Doppelter Vereinstaler">Doppelter Vereinstaler</option>
                                        <option value="5 Pesetas">5 Pesetas</option>
                                        <option value="7 Bolognini">7 Bolognini</option>
                                        <option value="20 Francs">20 Francs</option>
                                        <option value="Cob 8 Reales">Cob 8 Reales</option>
                                        <option value="Trihemiassarion">Trihemiassarion</option>
                                        <option value="Hohlpfennig">Hohlpfennig</option>
                                        <option value="Half Siliqua">Half Siliqua</option>
                                        <option value="50 Denarii">50 Denarii</option>
                                        <option value="268">1/4 Dinar</option>
                                        <option value="Oktadrachm or Mnaieion">Oktadrachm or Mnaieion</option>
                                        <option value="Quarter Stater">Quarter Stater</option>
                                        <option value="Hemistater or Drachm">Hemistater or Drachm</option>
                                        <option value="Heavy Follis">Heavy Follis</option>
                                        <option value="1/36 Stater">1/36 Stater</option>
                                        <option value="Gnostic Tessera">Gnostic Tessera</option>
                                        <option value="1/32 Siglos">1/32 Siglos</option>
                                        <option value="Half Follis">Half Follis</option>
                                        <option value="1/4 Ducat">1/4 Ducat</option>
                                        <option value="Taler">Taler</option>
                                        <option value="20 Dollars">20 Dollars</option>
                                        <option value="Trichryson or Pentadrachm">Trichryson or Pentadrachm</option>
                                        <option value="16 Litrai or Tetradrachm">16 Litrai or Tetradrachm</option>
                                        <option value="Radiate Fraction">Radiate Fraction</option>
                                        <option value="Triple Unit">Triple Unit</option>
                                        <option value="Medallion of four Siliquae">Medallion of four Siliquae</option>
                                        <option value="Amulet">Amulet</option>
                                        <option value="Exagium Solidi">Exagium Solidi</option>
                                        <option value="Weight of 1 Nomisma">Weight of 1 Nomisma</option>
                                        <option value="Weight of 6 Ounkia">Weight of 6 Ounkia</option>
                                        <option value="Weight of 3 Ounkia">Weight of 3 Ounkia</option>
                                        <option value="Weight of 18 Nomismata">Weight of 18 Nomismata</option>
                                        <option value="Weight of 2 Ounkia">Weight of 2 Ounkia</option>
                                        <option value="Weight of 5 Nomismata">Weight of 5 Nomismata</option>
                                        <option value="Weight of 4 Nomismata">Weight of 4 Nomismata</option>
                                        <option value="Weight of 12 Keratia">Weight of 12 Keratia</option>
                                        <option value="Weight of 8 Keratia">Weight of 8 Keratia</option>
                                        <option value="Weight of 10 Dirhams">Weight of 10 Dirhams</option>
                                        <option value="Eighth Unit">Eighth Unit</option>
                                        <option value="Quarter Unit">Quarter Unit</option>
                                        <option value="Fraction">Fraction</option>
                                        <option value="Cast Trias or Tetronkion">Cast Trias or Tetronkion</option>
                                        <option value="8 Reales">8 Reales</option>
                                        <option value="2 Reales">2 Reales</option>
                                        <option value="120 Grana - Piastra">120 Grana - Piastra</option>
                                        <option value="5 Lire">5 Lire</option>
                                        <option value="Aes Grave Teruncius">Aes Grave Teruncius</option>
                                        <option value="Cast Onkia">Cast Onkia</option>
                                        <option value="Saluto">Saluto</option>
                                        <option value="Pegione">Pegione</option>
                                        <option value="Ducato">Ducato</option>
                                        <option value="Fiorino d’oro">Fiorino d’oro</option>
                                        <option value="Denaro">Denaro</option>
                                        <option value="1/2 Mohur">1/2 Mohur</option>
                                        <option value="Mohur">Mohur</option>
                                        <option value="1/4 Mohur">1/4 Mohur</option>
                                        <option value="Teruncius">Teruncius</option>
                                        <option value="Quincunx">Quincunx</option>
                                        <option value="Rolabasso">Rolabasso</option>
                                        <option value="10 Litrai">10 Litrai</option>
                                        <option value="Tarì">Tarì</option>
                                        <option value="3 Groszy">3 Groszy</option>
                                        <option value="Dollar">Dollar</option>
                                        <option value="Morgan Dollar">Morgan Dollar</option>
                                        <option value="Oktobol">Oktobol</option>
                                        <option value="Pentonkion">Pentonkion</option>
                                        <option value="Tetras or Trionkion">Tetras or Trionkion</option>
                                        <option value="Ashrafi">Ashrafi</option>
                                        <option value="Half Ashrafi">Half Ashrafi</option>
                                        <option value="Half Dirham">Half Dirham</option>
                                        <option value="12 Nummi">12 Nummi</option>
                                        <option value="Half Unit">Half Unit</option>
                                        <option value="Oktachalkon">Oktachalkon</option>
                                        <option value="Pfennig">Pfennig</option>
                                        <option value="6 Kreuzer">6 Kreuzer</option>
                                        <option value="Weight of 8 Nomismata">Weight of 8 Nomismata</option>
                                        <option value="Weight of 9 Nomismata">Weight of 9 Nomismata</option>
                                        <option value="Weight of 1 Ounkia">Weight of 1 Ounkia</option>
                                        <option value="Weight of 2 Nomismata">Weight of 2 Nomismata</option>
                                        <option value="Weight of 50 Dirhams">Weight of 50 Dirhams</option>
                                        <option value="Fractional Denier">Fractional Denier</option>
                                        <option value="Sezin">Sezin</option>
                                        <option value="4 Nummi">4 Nummi</option>
                                        <option value="Half Guinea">Half Guinea</option>
                                        <option value="2 Dirhams">2 Dirhams</option>
                                        <option value="Weight of 5 Dirhams">Weight of 5 Dirhams</option>
                                        <option value="Scudo d'oro">Scudo d'oro</option>
                                        <option value="Terzarola">Terzarola</option>
                                        <option value="2 1/2 Nummi">2 1/2 Nummi</option>
                                        <option value="10 Roubles">10 Roubles</option>
                                        <option value="6 Ducati">6 Ducati</option>
                                        <option value="Vierzipfliger Pfennig">Vierzipfliger Pfennig</option>
                                        <option value="Runder Pfennig">Runder Pfennig</option>
                                        <option value="Viereckiger Pfennig">Viereckiger Pfennig</option>
                                        <option value="353">Vierzipfliger H&#228;lbling</option>
                                        <option value="Half Grosz">Half Grosz</option>
                                        <option value="20 Kopeks">20 Kopeks</option>
                                        <option value="50 Kopeks">50 Kopeks</option>
                                        <option value="3 Grossi">3 Grossi</option>
                                        <option value="4 Grossi">4 Grossi</option>
                                        <option value="Gros">Gros</option>
                                        <option value="Plappart">Plappart</option>
                                        <option value="Angster">Angster</option>
                                        <option value="1/4 Siglos">1/4 Siglos</option>
                                        <option value="Uniface Plaquette">Uniface Plaquette</option>
                                        <option value="Aes Formatum">Aes Formatum</option>
                                        <option value="Weight of 1 Stater">Weight of 1 Stater</option>
                                        <option value="Double Tournois">Double Tournois</option>
                                        <option value="Maille Blanche Hibernie">Maille Blanche Hibernie</option>
                                        <option value="Obole">Obole</option>
                                        <option value="Pale AV Thrymsa – Shilling">Pale AV Thrymsa – Shilling</option>
                                        <option value="Sceatt">Sceatt</option>
                                        <option value="Schilling">Schilling</option>
                                        <option value="Groat">Groat</option>
                                        <option value="Takvorin">Takvorin</option>
                                        <option value="5 Batzen">5 Batzen</option>
                                        <option value="Assis">Assis</option>
                                        <option value="20 Kreuzer">20 Kreuzer</option>
                                        <option value="4 Soldi">4 Soldi</option>
                                        <option value="1/4 Batzen">1/4 Batzen</option>
                                        <option value="Pound">Pound</option>
                                        <option value="Quadruple Unit">Quadruple Unit</option>
                                        <option value="20 Lire">20 Lire</option>
                                        <option value="1/4 Assarion">1/4 Assarion</option>
                                        <option value="Franc à pied">Franc à pied</option>
                                        <option value="20 Nummi – Half Follis">20 Nummi – Half Follis</option>
                                        <option value="40 Nummi – Follis">40 Nummi – Follis</option>
                                        <option value="Wuqiya">Wuqiya</option>
                                    </select>
                                </div>
                                <div class="checkbox col-md-2 col-sm-2 col-xs-12">
                                    <label>
                                        <div class="icheckbox_flat-green" style="position: relative;">
                                            <input name="cbQuestion" type="checkbox" id="cbQuestion" class="flat" style="position: absolute; opacity: 0;" />
                                            <ins class="iCheck-helper" style="position: absolute; top: 0%; left: 0%; display: block; width: 100%; height: 100%; margin: 0px; padding: 0px; background: rgb(255, 255, 255) none repeat scroll 0% 0%; border: 0px none; opacity: 0;"></ins>
                                        </div>
                                        (?)
                                    </label>
                                </div>
                                <div class="checkbox col-md-2 col-sm-2 col-xs-12">
                                    <label>
                                        <div class="icheckbox_flat-green" style="position: relative;">
                                            <input name="cbQuotation" type="checkbox" id="cbQuotation" class="flat" style="position: absolute; opacity: 0;" />
                                            <ins class="iCheck-helper" style="position: absolute; top: 0%; left: 0%; display: block; width: 100%; height: 100%; margin: 0px; padding: 0px; background: rgb(255, 255, 255) none repeat scroll 0% 0%; border: 0px none; opacity: 0;"></ins>
                                        </div>
                                        (')
                                    </label>
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="control-label col-md-3 col-sm-3 col-xs-12">Metal:</label>
                                <div class="col-md-5 col-sm-5 col-xs-12">
                                    <select name="ddlMetal" id="ddlMetal" class="select2_single form-control">
                                        <option value="">Selct metal</option>
                                        <option value="Gold">Gold</option>
                                        <option value="Electrum">Electrum</option>
                                        <option value="Platinum">Platinum</option>
                                        <option value="Silver">Silver</option>
                                        <option value="Billon">Billon</option>
                                        <option value="Bronze">Bronze</option>
                                        <option value="Orichalcum">Orichalcum</option>
                                        <option value="Potin">Potin</option>
                                        <option value="Copper">Copper</option>
                                        <option value="Tin">Tin</option>
                                        <option value="Lead">Lead</option>
                                        <option value="Brass">Brass</option>
                                        <option value="Bimetallic">Bimetallic</option>
                                        <option value="None">None</option>
                                        <option value="Subaeratus">Subaeratus</option>
                                        <option value="Subferratus">Subferratus</option>
                                        <option value="Silvered bronze">Silvered bronze</option>
                                        <option value="Iron">Iron</option>
                                        <option value="Terracotta">Terracotta</option>
                                        <option value="Glass">Glass</option>
                                    </select>
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="control-label col-md-3 col-sm-3 col-xs-12">Diameter:</label>
                                <div class="col-md-2 col-sm-2 col-xs-12">
                                    <input name="txtDiameter" type="text" value="" id="txtDiameter" class="form-control" placeholder="mm" />
                                </div>
                                <label class="control-label col-md-1 col-sm-1 col-xs-12">Weight:</label>
                                <div class="col-md-2 col-sm-2 col-xs-12">
                                    <input name="txtWeight" type="text" value="" id="txtWeight" class="form-control" placeholder="g" />
                                </div>
                                <label class="control-label col-md-2 col-sm-2 col-xs-12">Die Axis:</label>
                                <div class="col-md-2 col-sm-2 col-xs-12">
                                    <select name="ddlDie" id="ddlDie" class="select2_single form-control">
                                        <option value="N/A">N/A</option>
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                        <option value="5">5</option>
                                        <option value="6">6</option>
                                        <option value="7">7</option>
                                        <option value="8">8</option>
                                        <option value="9">9</option>
                                        <option value="10">10</option>
                                        <option value="11">11</option>
                                        <option value="12">12</option>
                                    </select>
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="control-label col-md-3 col-sm-3 col-xs-12">Standard or Type:</label>
                                <div class="col-md-9 col-sm-9 col-xs-12">
                                    <input name="txtStandard" type="text" id="txtStandard" class="form-control" placeholder="Standard or Type" />
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="control-label col-md-3 col-sm-3 col-xs-12">Mint / Magistrate:</label>
                                <div class="col-md-9 col-sm-9 col-xs-12">
                                    <input name="txtMint" type="text" value="" id="txtMint" class="form-control" placeholder="Mint / Magistrate" />
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="control-label col-md-3 col-sm-3 col-xs-12">Struck dates:</label>
                                <div class="col-md-9 col-sm-9 col-xs-12">
                                    <input name="txtStruck" type="text" value="" id="txtStruck" class="form-control" placeholder="Struck dates" />
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="control-label col-md-3 col-sm-3 col-xs-12">Upload coin picture</label>
                                <div class="col-md-9 col-sm-9 col-xs-12">
                                    <input name="file" type="file" value="" id="ctl00$image" class="form-" />
                                </div>
                            </div>
                            <div class="ln_solid"></div>
                            <div class="form-group">
                                <label class="control-label col-md-3 col-sm-3 col-xs-12">Obv. legend:</label>
                                <div class="col-md-9 col-sm-9 col-xs-12">
                                    <textarea name="txtObvLegend" rows="2" cols="20" id="txtObvLegend" class="form-control resizable_textarea" placeholder="Obverse legend"></textarea>
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="control-label col-md-3 col-sm-3 col-xs-12">Obv. description:</label>
                                <div class="col-md-9 col-sm-9 col-xs-12">
                                    <textarea name="txtObvLegendDesc" rows="2" cols="20" id="txtObvLegendDesc" class="form-control resizable_textarea" placeholder="Obverse description"></textarea>
                                </div>
                            </div>
                            <div class="ln_solid"></div>
                            <div class="form-group">
                                <label class="control-label col-md-3 col-sm-3 col-xs-12">Rev. legend:</label>
                                <div class="col-md-9 col-sm-9 col-xs-12">
                                    <textarea name="txtRevLegend" rows="2" cols="20" id="txtRevLegend" class="form-control resizable_textarea" placeholder="Reverse legend"></textarea>
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="control-label col-md-3 col-sm-3 col-xs-12">Rev. description:</label>
                                <div class="col-md-9 col-sm-9 col-xs-12">
                                    <textarea name="txtRevLegendDesc" rows="2" cols="20" id="txtRevLegendDesc" class="form-control resizable_textarea" placeholder="Reverse description"></textarea>
                                </div>
                            </div>
                            <div class="ln_solid"></div>
                            <div class="form-group">
                                <label class="control-label col-md-3 col-sm-3 col-xs-12">References:</label>
                                <div class="col-md-9 col-sm-9 col-xs-12">
                                    <textarea name="txtReferences" rows="2" cols="20" id="txtReferences" class="form-control resizable_textarea" placeholder="References"></textarea>
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="control-label col-md-3 col-sm-3 col-xs-12">Comments:</label>
                                <div class="col-md-9 col-sm-9 col-xs-12">
                                    <textarea name="txtComments" rows="2" cols="20" id="txtComments" class="form-control resizable_textarea" placeholder="Comments"></textarea>
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="control-label col-md-3 col-sm-3 col-xs-12">Defects:</label>
                                <div class="col-md-9 col-sm-9 col-xs-12">
                                    <input name="txtToning" type="text" id="txtToning" class="form-control" placeholder="Defects" />
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="control-label col-md-3 col-sm-3 col-xs-12">Grade:</label>
                                <div class="col-md-6 col-sm-6 col-xs-12">
                                    <select name="ddlGrade" id="ddlGrade" class="select2_single form-control">
                                        <option value="">Select Grade...</option>
                                        <option value="FDC">FDC</option>
                                        <option value="UNC">UNC</option>
                                        <option value="Virtually as struck">Virtually as struck</option>
                                        <option value="Good extremely fine">Good extremely fine</option>
                                        <option value="Nearly extremely fine">Nearly extremely fine</option>
                                        <option value="About extremely fine">About extremely fine</option>
                                        <option value="Good very fine">Good very fine</option>
                                        <option value="None">None</option>
                                        <option value="Very fine">Very fine</option>
                                        <option value="Nearly very fine">Nearly very fine</option>
                                        <option value="About very fine">About very fine</option>
                                        <option value="Good fine">Good fine</option>
                                        <option value="Fine">Fine</option>
                                        <option value="Nearly fine">Nearly fine</option>
                                        <option value="Fair">Fair</option>
                                    </select>
                                </div>
                                <div class="checkbox col-md-3 col-sm-3 col-xs-12">
                                    <label>
                                        <div class="icheckbox_flat-green" style="position: relative;">
                                            <input name="cbOtherwise" type="checkbox" id="cbOtherwise" class="flat" style="position: absolute; opacity: 0;" />
                                            <ins class="iCheck-helper" style="position: absolute; top: 0%; left: 0%; display: block; width: 100%; height: 100%; margin: 0px; padding: 0px; background: rgb(255, 255, 255) none repeat scroll 0% 0%; border: 0px none; opacity: 0;"></ins>
                                        </div>
                                        Otherwise
                                    </label>
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="control-label col-md-3 col-sm-3 col-xs-12">Pedigree:</label>
                                <div class="col-md-9 col-sm-9 col-xs-12">
                                    <textarea name="txtPedigree" rows="2" cols="20" id="txtPedigree" class="form-control resizable_textarea" placeholder="Pedigree"></textarea>
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="control-label col-md-3 col-sm-3 col-xs-12">Notes:</label>
                                <div class="col-md-9 col-sm-9 col-xs-12">
                                    <textarea name="txtNotes" rows="2" cols="20" id="txtNotes" class="form-control resizable_textarea" placeholder="Notes"></textarea>
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="control-label col-md-3 col-sm-3 col-xs-12">Check:</label>
                                <div class="col-md-9 col-sm-9 col-xs-12">
                                    <select name="ddlCondition" id="ctl00_ddlCondition" class="select2_single form-control">
                                        <option value="None">None</option>
                                        <option value="Finalized">Finalized</option>
                                        <option value="Unfinished">Unfinished</option>
                                    </select>
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="control-label col-md-3 col-sm-3 col-xs-12">Multiple lots:</label>
                                <div class="col-md-9 col-sm-9 col-xs-12">
                                    <textarea name="txtMultipleLots" rows="2" cols="20" id="txtMultipleLots" class="form-control resizable_textarea" placeholder="Multiple Lots"></textarea>
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="control-label col-md-3 col-sm-3 col-xs-12">Header:</label>
                                <div class="col-md-9 col-sm-9 col-xs-12">
                                    <input name="txtHeader" type="text" id="ctl00_txtHeader" class="form-control" placeholder="Header" />
                                </div>
                            </div>
                            <div class="ln_solid"></div>
                            {{-- <div class="form-group">
                                <label class="control-label col-md-3 col-sm-3 col-xs-12">Plain HTML:</label>
                                <div class="col-md-9 col-sm-9 col-xs-12">
                                    <div class="col-md-12 col-sm-12 col-xs-12">
                                        <textarea name="txtMirror" rows="2" cols="20" id="txtMirror" class="form-control-special" placeholder="Finalized HTML">
                                            &lt;b&gt;ISLAMIC, Umayyad Caliphate. <i>al-Walid I ibn 'Abd al-Malik</i>, AH 86-96 / AD 705-715.&lt;/b&gt; Dirham (Silver, 26 mm, 2.87 g, 7 h), Wasit, dated AH 93 (AD 710/11).  Album 128. Good extremely fine.
                                        </textarea>
                                    </div>
                                    <div class="col-md-12 col-sm-12 col-xs-12">
                                        <span id="lblPosition">Start position: None</span>
                                    </div>
                                    <div class="col-md-12 col-sm-12 col-xs-12">
                                        <label class="label-warning">Do not select HTML Tags for mirroring.</label>
                                        <button id="btnMirror" class="btn btn-success btn-xs pull-right" type="button">Mirror selection</button>
                                    </div>
                                </div>
                            </div> --}}
                            {{-- <div class="form-group">
                                <label class="control-label col-md-3 col-sm-3 col-xs-12">Existing selections:</label>
                                <div class="col-md-9 col-sm-9 col-xs-12">
                                    <table id="tMirror" class="table jambo_table table-responsive">
                                        <thead>
                                            <tr>
                                                <th>Text</th>
                                                <th>Start</th>
                                                <th>End</th>
                                                <th>Remove</th>
                                            </tr>
                                        </thead>
                                    </table>
                                </div>
                            </div> --}}
                            <div class="ln_solid"></div>
                            <div class="form-group">
                                <label class="control-label col-md-3 col-sm-3 col-xs-12">Collection:</label>
                                <div class="col-md-9 col-sm-9 col-xs-12">
                                    <select name="ddlCollection" id="ddlCollection" class="select2_single form-control">
                                        <option value="n/a">n/a</option>
                                        <option value="The G.G. Collection">The G.G. Collection</option>
                                        <option value="The Saitta Collection">The Saitta Collection</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-sm-5 col-xs-12">
                    <!-- Right column panels -->
                    <div class="x_panel" id="pFinalized">
                        <div class="x_title">
                            <h2> Auction details <small><span id="sPercentage"></span></small></h2>
                            <ul class="nav navbar-right panel_toolbox">
                                <li><a class="collapse-link"><i class="fa fa-chevron-up"></i></a>
                                </li>
                            </ul>
                            <div class="clearfix"></div>
                        </div>
                        <div class="x_content" id="x_c_finalized">
                            <div class="col-md-12 col-sm-12 col-xs-12">
                                <div class="form-group">
                                    <label class="control-label col-md-3 col-sm-3 col-xs-12">Starting Price:</label>
                                    <div class="col-md-9 col-sm-9 col-xs-12">
                                        <input name="starting_price" type="text" value="" id="" class="form-control" placeholder="Starting Price" />
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="control-label col-md-3 col-sm-3 col-xs-12">Bid increment:</label>
                                    <div class="col-md-9 col-sm-9 col-xs-12">
                                        <input name="bid_increment" type="text" value="" id="" class="form-control" placeholder="Bid increment" />
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="control-label col-md-3 col-sm-3 col-xs-12">Auction starts:</label>
                                    <div class="col-md-9 col-sm-9 col-xs-12">
                                        <input name="auction_starts" type="date" value="" id="" class="form-control" />
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="control-label col-md-3 col-sm-3 col-xs-12">Auction ends:</label>
                                    <div class="col-md-9 col-sm-9 col-xs-12">
                                        <input name="auction_ends" type="date" value="" id="" class="form-control" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="x_panel" id="pNavigation">
                        <div class="x_title">
                            <h2> Add Coin <small></small></h2>
                            <ul class="nav navbar-right panel_toolbox" id="aNavigationCollapse">
                                <li><a class="collapse-link"><i class="fa fa-chevron-up"></i></a>
                                </li>
                            </ul>
                            <div class="clearfix"></div>
                        </div>
                        @if ($errors->any())
                        <div class="alert alert-danger">
                            <ul>
                                @foreach ($errors->all() as $error)
                                <li>{{ $error }}</li>
                                @endforeach
                            </ul>
                        </div>
                        @endif
                        <div class="form-group">
                            {{-- <div class="col-md-6 col-sm-6 col-xs-12"></div> --}}
                            <div class="">
                                <input type="submit" name="btnSetInventory" value="Add Coin" id="btnSetInventory" class="btn btn-success" />
                                {{-- <input type="submit" name="btnCancel" value="Cancel" id="ctl00_btnCancel" class="btn btn-primary pull-right" /> --}}
                            </div>
                        </div>
                        {{--
                    </div> --}}
                </div>
            </div>
        </div>
</div>
<style>
.div-toolbar {
    background-color: #e3f7fc;
    display: none;
    box-shadow: 2px 2px 2px 0px rgba(0, 0, 0, 0.3);
    margin-left: 0.1em;
    margin-right: 0.1em;
}

.div-toolbar.active {
    display: block;
}

.btn-char {
    margin: 0.05em !important;
    min-width: 1.4em;
    padding: 8px 2px !important;
    line-height: 0.1 !important;
}

.form-control-special {
    display: block;
    width: 100%;
    padding: 6px 12px;
    font-size: 14px;
    line-height: 1.42857143;
    color: #555;
    background-color: #fff;
    background-image: none;
    border: 1px solid #ccc;
    border-radius: 0;
    -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, .075);
    box-shadow: inset 0 1px 1px rgba(0, 0, 0, .075);
    -webkit-transition: border-color ease-in-out .15s, -webkit-box-shadow ease-in-out .15s;
    -o-transition: border-color ease-in-out .15s, box-shadow ease-in-out .15s;
    transition: border-color ease-in-out .15s, box-shadow ease-in-out .15s;
    min-height: 54px;
    height: auto;
}

.form-control-special:focus {
    border-color: #66afe9;
    outline: 0;
    -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, .075), 0 0 8px rgba(102, 175, 233, .6);
    box-shadow: inset 0 1px 1px rgba(0, 0, 0, .075), 0 0 8px rgba(102, 175, 233, .6);
}

</style>
</form>

<script type="text/javascript">
    var rootPath = window.location.protocol + '//' + window.location.hostname;
    function fetchCountry(value){
        if(!value){
            return
        }
        let url = rootPath + `/api/category_to_country?category=${value}`;
        // alert(url);
        $.ajax({
            type: 'GET',
            url: url,
            success:function(data){
                let reqCountry = data.data.country;
                let countries = reqCountry.split(',');
                let countryNode = $('#ddlCountry');
                countryNode.empty();
                countries.forEach((country) => {
                  countryNode.append(`<option value="${country}"> ${country} </option>`)
                })
                countryNode.focus();
            }
        });
    }

    function fetchRegion(value){
        if(!value){
            return
        }
        let url = rootPath + `/api/country_to_region?country=${value}`;
        $.ajax({
            type: 'GET',
            url: url,
            success:function(data){
                let reqCountry = data.data.region;

                let regions = reqCountry.split(',');
                let focusNode = $('#ddlRegion');
                focusNode.empty();
                regions.forEach((region) => {
                  focusNode.append(`<option value="${region}"> ${region} </option>`)
                })
                focusNode.focus();
            }
        });
    }

    function fetchCity(value){
        alert(value)
        if(!value){
            return
        }
        let url = rootPath + `/api/region_to_city?region=${value}`;
        alert(url);
        $.ajax({
            type: 'GET',
            url: url,
            success:function(data){
                console.log(data)
                let reqCountry = data.data.city;

                let cities = reqCountry.split(',');
                let focusNode = $('#ddlCity');
                focusNode.empty();
                cities.forEach((city) => {
                  focusNode.append(`<option value="${city}"> ${city} </option>`)
                })
                focusNode.focus();
            }
        });
    }
</script>
</div>
<!-- /page content -->
@stop
@section('title')
Atnumis &middot Add new auction coin.
@stop
