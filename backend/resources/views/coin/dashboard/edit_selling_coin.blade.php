@extends('coin.dashboard.master')


@section('content')
<!-- page content -->
<div class="right_col" role="main">
    <form method="post" action="/selling/update" id="theForm" class="form-horizontal form-label-left" data-parsley-validate="">

        {{ csrf_field() }}
        <input type="hidden" name="_id" value="{{ $coin->id }}">

          @if ($errors->any())
            <div class="alert alert-danger">
                <ul>
                    @foreach ($errors->all() as $error)
                        <li>{{ $error }}</li>
                    @endforeach
                </ul>
            </div>
        @endif
    
        <link rel="stylesheet" type="text/css" href="{{ asset('vendors/slick/slick.css') }}" />
        <script type="text/javascript" src="{{ asset('vendors/slick/slick.min.js') }}"></script>
       
         <div style="margin-top: 70px;">
            @if( Session::has('flash') )
                <div class="alert alert-info">
                    {{ Session::get('flash') }}
                </div>
            @endif
        </div>

        <link rel="stylesheet" type="text/css" href="{{ asset('vendors/slick/slick.css') }}" />
        <script type="text/javascript" src="{{ asset('vendors/slick/slick.min.js') }}"></script>
        <script type="text/javascript">
        var tMirror;
        String.prototype.splice = function(idx, rem, str) {
            return this.slice(0, idx) + str + this.slice(idx + Math.abs(rem));
        };
        $(document).scroll(function() {
            var pOffsetHeight = 140;
            //var pOffsetHeight = $('#pNavigation').height() + 90;
            if ($(document).scrollTop() > pOffsetHeight) {
                $('#pNavigation').css({ top: $(document).scrollTop() - pOffsetHeight });
                $('#pFinalized').css({ top: $(document).scrollTop() - pOffsetHeight });
            } else {
                $('#pNavigation').css({ top: '1px' });
                $('#pFinalized').css({ top: '1px' });
            }

        })

        function InsertCharacter(chars, aeEl) {
            if (aeEl != "none") {
                insertAtCaret(aeEl, chars);
                setFinalize();
            }
        }
        // From http://flightschool.acylt.com/devnotes/caret-position-woes/
        function insertAtCaret(areaId, text) {
            var txtarea = document.getElementById(areaId);
            var scrollPos = txtarea.scrollTop;
            var strPos = 0;
            var br = ((txtarea.selectionStart || txtarea.selectionStart == '0') ?
                "ff" : (document.selection ? "ie" : false));
            if (br == "ie") {
                txtarea.focus();
                var range = document.selection.createRange();
                range.moveStart('character', -txtarea.value.length);
                strPos = range.text.length;
            } else if (br == "ff") strPos = txtarea.selectionStart;

            var front = (txtarea.value).substring(0, strPos);
            var back = (txtarea.value).substring(strPos, txtarea.value.length);
            txtarea.value = front + text + back;
            strPos = strPos + text.length;
            if (br == "ie") {
                txtarea.focus();
                var range = document.selection.createRange();
                range.moveStart('character', -txtarea.value.length);
                range.moveStart('character', strPos);
                range.moveEnd('character', 0);
                range.select();
            } else if (br == "ff") {
                txtarea.selectionStart = strPos;
                txtarea.selectionEnd = strPos;
                txtarea.focus();
            }
            txtarea.scrollTop = scrollPos;
        }

        function pageLoad() {

            $("#divPreview").slick({
                infinite: true,
                slidesToShow: 1,
                slidesToScroll: 1,
                speed: 500,
                nextArrow: $(".glyphicon-menu-right"),
                prevArrow: $(".glyphicon-menu-left"),
                autoplay: false,
                swipe: false
            });


            if ($("#hfVenueError").val() === "false") {
                new PNotify({
                    title: 'Venues',
                    text: 'Cannot remove some venues. Please contact administrator.',
                    type: 'error',
                    styling: 'bootstrap3'
                });
                $("#hfVenueError").val("");
            }

            $("#divLycian").hide();
            $("#divAramaic").hide();
            $("#divPunic").hide();

            $("#btnLycian").click(function() {
                showKeyboard("Lycian");
            });
            $("#btnGreek").click(function() {
                showKeyboard("Greek");
            });
            $("#btnAramaic").click(function() {
                showKeyboard("Aramaic");
            });
            $("#btnPunic").click(function() {
                showKeyboard("Punic");
            });

            // Show Keyboard
            function showKeyboard(Type) {
                $("#divLycian").hide();
                $("#divGreek").hide();
                $("#divAramaic").hide();
                $("#divPunic").hide();


                switch (Type) {
                    case "Lycian":
                        $("#divLycian").show();
                        break;
                    case "Greek":
                        $("#divGreek").show();
                        break;
                    case "Aramaic":
                        $("#divAramaic").show();
                        break;
                    case "Punic":
                        $("#divPunic").show();
                        break;
                }

            }

            // Conversion Rate display
            var intCost = 0;
            intCost = parseInt($("#txtCosts").val());
            var fConversionRate = 0;
            fConversionRate = parseFloat($("#txtConversionRate").val());
            var fCostInCHF = intCost * fConversionRate;
            if (fCostInCHF > 0) {
                $("#divInCHF").html(fCostInCHF.toFixed(0) + " CHF");
            }

            // Key down Enter
            $(window).keydown(function(event) {
                if (event.keyCode == 13) {
                    event.preventDefault();
                    return false;
                }
            });

            $('#btnSetInventory').on('click', function(e) {
                e.preventDefault();
                setFinalize();
                $("#hfExternals").val($("#ddlExternal").val());

                var intVenues = [];

                $("#ddlVenues option:selected").each(function() {
                    intVenues.push($(this).val());

                });


                $("#hfVenues").val(intVenues);
                $('#theForm').parsley().validate();
                validateFront();
            });
            var validateFront = function() {
                if (true === $('#theForm').parsley().isValid()) {
                    $('.bs-callout-info').removeClass('hidden');
                    $('.bs-callout-warning').addClass('hidden');

                    new PNotify({
                        title: 'Finalized',
                        text: 'Inventory finalized and saved to database.',
                        type: 'success',
                        styling: 'bootstrap3'
                    });
                    $("#btnSaveInventory").click();
                } else {
                    $('.bs-callout-info').addClass('hidden');
                    $('.bs-callout-warning').removeClass('hidden');
                }
            };

            $("#btnMirror").click(function() {
                var cursorStart = $("#txtMirror").prop("selectionStart");
                var cursorEnd = $("#txtMirror").prop("selectionEnd");
                var intLength = cursorEnd - cursorStart
                if (intLength === 0) {

                    new PNotify({
                        title: 'Mirroring',
                        text: 'No selection made. You have to select the text in the text area and click on mirror selection.',
                        type: 'error',
                        styling: 'bootstrap3'
                    });
                } else {
                    var strSelectedText = $("#txtMirror").val().substring(cursorStart, cursorEnd);
                    if (strSelectedText.indexOf("<") === -1 && strSelectedText.indexOf(">") === -1) {

                        $.ajax({
                            url: "/backofficesource/BackofficeService.asmx/SetMirroring",
                            data: "{strUser:'" + $("#hfUser").val() + "', intInventoryID:'" + $("#txtInventoryID").val() + "', intStart:'" + cursorStart + "', intEnd:'" + cursorEnd + "', strText:'" + strSelectedText + "'}",
                            type: "POST",
                            dataType: "json",
                            contentType: "application/json; charset=utf-8",
                            success: function(response) {
                                var intMirrorID = parseInt(response.d);
                                if (intMirrorID === 0) {
                                    new PNotify({
                                        title: 'Mirroring',
                                        text: 'Insert not possible due to conflicting existing selection.',
                                        type: 'error',
                                        styling: 'bootstrap3'
                                    });
                                } else {
                                    tMirror.ajax.reload(null, false);
                                    new PNotify({
                                        title: 'Mirroring',
                                        text: 'Insert successful.',
                                        type: 'success',
                                        styling: 'bootstrap3'
                                    });
                                }

                            }
                        })

                    } else {
                        new PNotify({
                            title: 'Mirroring',
                            text: 'HTML Tag detected. HTML Tags are not allowed to be mirrored.',
                            type: 'error',
                            styling: 'bootstrap3'
                        });
                    }
                }
            });

            $("#txtMirror").click(function() {
                var cursorStart = $("#txtMirror").prop("selectionStart");
                var cursorEnd = $("#txtMirror").prop("selectionEnd");
                $("#lblPosition").html("Start position: " + cursorStart);
            });

            tMirror = $("#tMirror").DataTable({
                "processing": true,
                "serverSide": true,
                "autoWidth": false,
                "stateSave": false,
                "pageLength": 100,
                "order": [
                    [1, "desc"]
                ],
                "sDom": 'tri',
                "ajax": function(data, callback, settings) {
                    $.when(GetMirror(data)).done(function(a1) {
                        callback(jsonData);
                    });

                },
                "columns": [
                    { "data": "Text" },
                    { "data": "Start" },
                    { "data": "End" },
                    { "data": "Option" }
                ],
                "columnDefs": [{
                        "targets": 0,
                        "searchable": false,
                        "orderable": false,

                    },
                    {
                        "targets": 1,
                        "searchable": false,
                        "orderable": false,

                    },
                    {
                        "targets": 2,
                        "searchable": false,
                        "orderable": false,

                    },
                    {
                        "targets": 3,
                        "render": function(data, type, full, meta) {
                            return '<button class="btn btn-primary btn-xs btn-remove" type="button" PK_ID="' + full.ID + '">Remove</button>';
                        },
                        "searchable": false,
                        "orderable": false,

                    }
                ]
            });
            tMirror.on("draw", function() {
                setFinalize();
            });


            $("#iInventories").ionRangeSlider({
                type: "single",
                min: $("#hfMinInventory").val(),
                max: $("#hfMaxInventory").val(),
                from: $("#hfInventoryID").val(),
                step: 1,
                keyboard: true,
                onChange: function(data) {
                    $("#txtInventoryID").val(data.from);
                },
                onFinish: function(data) {
                    $("#btnSliderFinish").click();
                },
                onUpdate: function(data) {
                    console.log("onUpdate");
                }

            });

            $(".form-control").focus(function() {
                $("#divInputToolbar").hide();
            });

            $("#txtObvLegend,#txtObvLegendDesc,#txtRevLegend,#txtRevLegendDesc").focus(function() {
                $("#divInputToolbar").show();
                $("#divInputToolbar").appendTo($(this).parent());

            });

            // AUTOCOMPLETE
            var intInventoryArray = $("#hfInventoryNumberArray").val().split(',');
            $('#txtInventoryID').autocomplete({
                minChars: 3,
                lookup: intInventoryArray,
                onSelect: function() {
                    $("#btnSliderFinish").click();
                }
            });

            var jsonDates = [];
            if ($("#hfDates").val().length > 0) {
                jsonDates = JSON.parse($("#hfDates").val());
            }

            $('#txtDate').autocomplete({
                lookup: jsonDates,
                minChars: 0,
                onSelect: function(suggestion) {
                    if ($("#txtReferences").val() === "") {
                        $("#txtReferences").val(suggestion.data);
                    }
                    setFinalize();
                }
            }).focus(function() {
                $(this).autocomplete('search', $(this).val());
            });

            // DATE PICKER
            $('.calendar').datepicker({
                format: "dd.mm.yyyy",
                todayBtn: "linked",
                autoclose: true,
                todayHighlight: true
            });

            $(".select2_single").chosen();

            // CONSINGNOR AUTOCOMPLETE

            $("#txtConsignor").autocomplete({
                lookup: function(query, done) {
                    $.ajax({
                        url: "/backofficesource/BackofficeService.asmx/GetConsignors",
                        data: "{query:'" + query + "'}",
                        type: "POST",
                        dataType: "json",
                        contentType: "application/json; charset=utf-8",
                        success: function(response) {
                            var result = { suggestions: [] };
                            var json = JSON.parse(response.d);
                            result.suggestions = json;
                            done(result);
                        }
                    })
                },
                onSelect: function(suggestion) {
                    $("#txtConsignorID").val(suggestion.data);
                }

            });


            //#region ############### SET FINALZE ################

            $(".form-control").keyup(function(e) {
                setFinalize();
            });
            $("#ddlDenomination, #ddlMetal, #ddlCategory, #ddlCountry, #ddlRegion, #ddlCity, #ddlRuler, #ddlDie, #ddlGrade").change(function() {
                setFinalize();
            })

            $("#txtToning").keyup(function() {
                if ($("#txtToning").val() === "") {
                    $("#cbOtherwise").prop("checked", false);
                }
            });
            //#region ############### END SET FINALIZE ################


            autosize($('.resizable_textarea'));

            $("input.flat").iCheck({
                checkboxClass: "icheckbox_flat-green",
                radioClass: "iradio_flat-green"
            });

            $('input.flat').on('ifChecked', function(event) {
                setFinalize();
            });
            $('input.flat').on('ifUnchecked', function(event) {
                setFinalize();
            });

            $('.collapse-link').unbind();
            $('.collapse-link').on('click', function() {

                var $BOX_PANEL = $(this).closest('.x_panel'),
                    $ICON = $(this).find('i'),
                    $BOX_CONTENT = $BOX_PANEL.find('.x_content');


                var strCollPanel = $("#hfCollapsedPanel").val();
                if (strCollPanel.indexOf($BOX_CONTENT.attr("id")) < 0) {
                    $("#hfCollapsedPanel").val($("#hfCollapsedPanel").val() + "," + $BOX_CONTENT.attr("id"));
                } else {
                    $("#hfCollapsedPanel").val($("#hfCollapsedPanel").val().substring("," + $BOX_CONTENT.attr("id"), ""));
                }

                // fix for some div with hardcoded fix class
                if ($BOX_PANEL.attr('style')) {
                    $BOX_CONTENT.slideToggle(200, function() {
                        $BOX_PANEL.removeAttr('style');
                    });
                } else {
                    $BOX_CONTENT.slideToggle(200);
                    $BOX_PANEL.css('height', 'auto');
                }

                $ICON.toggleClass('fa-chevron-up fa-chevron-down');

            });

        };

        $(document).on("click", ".btn-remove", function(e) {
            var PK_ID = $(this).attr("PK_ID");

            bootbox.confirm({
                message: "Are you sure you want to remove this section?",
                buttons: {
                    confirm: {
                        label: 'Yes',
                        className: 'btn-success'
                    },
                    cancel: {
                        label: 'No',
                        className: 'btn-danger'
                    }
                },
                callback: function(result) {
                    if (result === true) {

                        $.ajax({
                            url: "/backofficesource/BackofficeService.asmx/DelMirror",
                            data: "{strUser:'" + $("#hfUser").val() + "', intMirrorID:'" + PK_ID + "'}",
                            type: "POST",
                            dataType: "json",
                            contentType: "application/json; charset=utf-8",
                            success: function(response) {
                                tMirror.ajax.reload(null, false);

                                new PNotify({
                                    title: 'Mirroring',
                                    text: 'Remove successful.',
                                    type: 'success',
                                    styling: 'bootstrap3'
                                });

                            }
                        })
                    }
                }
            });

        });


        // Sys.WebForms.PageRequestManager.getInstance().add_beginRequest(BeginRequestHandler);
        // Sys.WebForms.PageRequestManager.getInstance().add_endRequest(EndRequestHandler);

        function BeginRequestHandler(sender, args) {
            $("#loading-indicator").show();
        }

        function EndRequestHandler(sender, args) {
            setFinalize();

            var strCollArray = $("#hfCollapsedPanel").val().split(",");
            $.each(strCollArray, function(i, value) {
                if (value != "") {
                    var $BOX_CONTENT = $("#" + value);
                    $BOX_CONTENT.hide();
                    var $ICON = $BOX_CONTENT.parent().find("i");
                    $ICON.toggleClass('fa-chevron-up fa-chevron-down');
                }
            });

            var pOffsetHeight = 140;
            //var pOffsetHeight = $('#pNavigation').height() + 90;
            if ($(document).scrollTop() > pOffsetHeight) {
                $('#pNavigation').css({ top: $(document).scrollTop() - pOffsetHeight });
                $('#pFinalized').css({ top: $(document).scrollTop() - pOffsetHeight });
            } else {
                $('#pNavigation').css({ top: '1px' });
                $('#pFinalized').css({ top: '1px' });
            }

            var intAutoOpenCiteria = 2;
            var strAsyncPrefix = "ctl00$";
            var strSender = sender._postBackSettings.asyncTarget;
            if (strSender != null) {
                strSender = strSender.replace(strAsyncPrefix, "");

                switch (strSender) {
                    case "ddlCategory":
                        if ($("#ddlCountry").children("option").length > intAutoOpenCiteria) {
                            $("#ddlCountry").trigger("chosen:open");
                        } else {
                            if ($("#ddlRegion").children("option").length > intAutoOpenCiteria) {
                                $("#ddlRegion").trigger("chosen:open");
                            } else {
                                if ($("#ddlCity").children("option").length > intAutoOpenCiteria) {
                                    $("#ddlCity").trigger("chosen:open");
                                } else {
                                    if ($("#ddlRuler").children("option").length > intAutoOpenCiteria) {
                                        $("#ddlRuler").trigger("chosen:open");
                                    } else {
                                        $("#txtDate").focus();
                                    }
                                }
                            }
                        }
                        break;
                    case "ddlCountry":
                        if ($("#ddlRegion").children("option").length > intAutoOpenCiteria) {
                            $("#ddlRegion").trigger("chosen:open");
                        } else {
                            if ($("#ddlCity").children("option").length > intAutoOpenCiteria) {
                                $("#ddlCity").trigger("chosen:open");
                            } else {
                                if ($("#ddlRuler").children("option").length > intAutoOpenCiteria) {
                                    $("#ddlRuler").trigger("chosen:open");
                                } else {
                                    $("#txtDate").focus();
                                }
                            }
                        }
                        break;
                    case "ddlRegion":
                        if ($("#ddlCity").children("option").length > intAutoOpenCiteria) {
                            $("#ddlCity").trigger("chosen:open");
                        } else {
                            if ($("#ddlRuler").children("option").length > intAutoOpenCiteria) {
                                $("#ddlRuler").trigger("chosen:open");
                            } else {
                                $("#txtDate").focus();
                            }
                        }
                        break;
                    case "ddlCity":
                        if ($("#ddlRuler").children("option").length > intAutoOpenCiteria) {
                            $("#ddlRuler").trigger("chosen:open");
                        } else {
                            $("#txtDate").focus();
                        }
                        break;
                    case "ddlRuler":
                        $("#txtDate").focus();
                        break;
                    default:
                        break;

                }
            }
            $("#loading-indicator").hide();

        }

        function clearFilter() {
            $.when(SetSessionState()).done(function(a1) {
                document.location.href = 'default.aspx?page=ucInventory&id=' + $("#txtInventoryID").val();
            });
        }

        function SetSessionState() {
            return $.ajax({
                type: "POST",
                url: "/backofficesource/BackofficeService.asmx/SetSessionState",
                data: "{strState:'FilterArray', strData:''}",
                dataType: "json",
                contentType: "application/json; charset=utf-8",
                success: function(response) {
                    return true;
                },
                error: function(error) {
                    console.log(error);
                }
            });
        }

        function GetMirror(data) {
            return $.ajax({
                type: "POST",
                url: "/backofficesource/BackofficeService.asmx/GetMirrors",
                data: "{strUser:'" + $("#hfUser").val() + "', json:'" + JSON.stringify(data) + "', intInventoryID:'" + $("#txtInventoryID").val() + "'}",
                dataType: "json",
                contentType: "application/json; charset=utf-8",
                success: function(response) {
                    jsonData = JSON.parse(response.d);
                },
                error: function(error) {
                    console.log(error);
                }
            });
        }
        //#region ############### FINALIZE ################
        function setFinalize() {

            var strEndsWith;
            //$("#lblFinal").css("word-wrap", "break-word");

            // Conversion rate
            var intCost = 0;
            intCost = parseInt($("#txtCosts").val());
            var fConversionRate = 0;
            fConversionRate = parseFloat($("#txtConversionRate").val());
            var fCostInCHF = intCost * fConversionRate;
            if (fCostInCHF > 0) {
                $("#divInCHF").html(fCostInCHF.toFixed(0) + " CHF");
            }

            // Category
            var NOT_APPLICABLE = "n/a";

            var strCategoryFinalize = "";
            var bQuestionCity = $("#cbQuestionCity").is(":checked");
            var bQuestionRuler = $("#cbQuestionRuler").is(":checked");
            var strCountryName = $("#ddlCountry option:selected").text();
            var strRegionName = $("#ddlRegion option:selected").text();
            var strCityName = $("#ddlCity option:selected").text() + (bQuestionCity === true ? " (?)" : "");
            var strRulerName = $("#ddlRuler option:selected").text() + (bQuestionRuler === true ? " (?)" : "");
            var strDateName = $("#txtDate").val();

            if (strDateName == "1" || strDateName == "-1") {
                strDateName = "";
            }
            if (strDateName.indexOf(NOT_APPLICABLE) >= 0) {
                strDateName = NOT_APPLICABLE;
            }

            strCategoryFinalize = "<b>";


            // COUNTRY, Region.
            if (strCountryName != "" && strCountryName != "0" && strCountryName != NOT_APPLICABLE && strCountryName != "None") {
                strCategoryFinalize += strCountryName.toUpperCase();
            }
            if (strRegionName != "" && strRegionName != "0" && strRegionName != NOT_APPLICABLE && strRegionName != "None") {
                if (strCountryName != "" && strCountryName != "0" && strCountryName != NOT_APPLICABLE && strCountryName != "None") {
                    strCategoryFinalize += ", ";
                    strCategoryFinalize += strRegionName;
                    strCategoryFinalize += ". ";
                } else {
                    strCategoryFinalize += strRegionName;
                    strCategoryFinalize += ". ";
                }
            } else {
                if (strCountryName != "" && strCountryName != "0" && strCountryName != NOT_APPLICABLE && strCountryName != "None") {
                    strCategoryFinalize += ". ";
                }
            }

            // City
            if (strCityName != "" && strCityName != "0" && strCityName != NOT_APPLICABLE && strCityName != "None") {
                strCategoryFinalize += strCityName;
                if (strRulerName != "" && strRulerName != "0" && strRulerName != NOT_APPLICABLE && strRulerName != "None") {
                    strCategoryFinalize += ". ";
                } else {
                    if (strDateName != "" && strDateName != "0" && strDateName != NOT_APPLICABLE && strDateName != "None") {
                        strCategoryFinalize += ". ";
                    }
                }
            }

            // Ruler. Date of Ruler.
            var intLastIndex = strDateName.lastIndexOf(")");
            var intFirstIndex = strDateName.indexOf("(");

            strDateName = strDateName.replace("Century", "century");

            if (intFirstIndex > 0 && intLastIndex > intFirstIndex) {

                var strDateSubstring = strDateName.substring(intFirstIndex - 1, intLastIndex + 1);
                strDateName = strDateName.replace(strDateSubstring, "");
            }

            if (strRulerName != "" && strRulerName != "0" && strRulerName != NOT_APPLICABLE && strRulerName != "None") {
                if (strRegionName != "" && strRegionName != "0" && strRegionName != NOT_APPLICABLE && strRegionName != "None") {
                    strCategoryFinalize += "<i>" + strRulerName + "</i>";
                } else {
                    if (strCityName != "" && strCityName != "0" && strCityName != NOT_APPLICABLE && strCityName != "None") {
                        strCategoryFinalize += "<i>" + strRulerName + "</i>";
                    } else {
                        strCategoryFinalize += strRulerName;
                    }
                }

            } else {
                if (strDateName.indexOf("circa") === 0) {
                    strDateName = strDateName.replace("circa", "Circa");
                }
                if (strDateName.indexOf("late") === 0) {
                    strDateName = strDateName.replace("late", "Late");
                }
                if (strDateName.indexOf("mid-late") === 0) {
                    strDateName = strDateName.replace("mid-late", "Mid-late");
                }
                if (strDateName.indexOf("mid") === 0) {
                    strDateName = strDateName.replace("mid", "Mid");
                }
                if (strDateName.indexOf("early") === 0) {
                    strDateName = strDateName.replace("early", "Early");
                }
                if (strDateName.indexOf("early-mid") === 0) {
                    strDateName = strDateName.replace("early-mid", "Early-mid");
                }

            }
            if (strDateName != "" && strDateName != "0" && strDateName != NOT_APPLICABLE && strDateName != "None") {
                if (strRulerName != "" && strRulerName != "0" && strRulerName != NOT_APPLICABLE && strRulerName != "None") {
                    strCategoryFinalize += ", ";
                    strCategoryFinalize += strDateName;
                    strCategoryFinalize += ".";
                } else {
                    strCategoryFinalize += strDateName;
                    strCategoryFinalize += ".";
                }
            } else {
                if ((strDateName != "" && strDateName != "0" && strDateName != NOT_APPLICABLE && strDateName != "None") || (strRulerName != "" && strRulerName != "0" && strRulerName != NOT_APPLICABLE && strRulerName != "None") || (strCityName != "" && strCityName != "0" && strCityName != NOT_APPLICABLE && strCityName != "None")) {
                    strCategoryFinalize += ".";
                }
            }


            strCategoryFinalize += "</b> ";


            var varDenomination = $("#ddlDenomination option:selected").text();
            var varMetal = $("#ddlMetal option:selected").text();
            var varDiameter = $("#txtDiameter").val();
            var varWeight = $("#txtWeight").val();
            var varDie = $("#ddlDie option:selected").text();
            var varStandard = $("#txtStandard").val();
            var varMint = $("#txtMint").val();
            var varStruck = $("#txtStruck").val();
            var varGrade = $("#ddlGrade option:selected").text();
            var varDefects = $("#txtToning").val();
            var bOtherwise = $("#cbOtherwise").is(":checked");
            var bQuestion = $("#cbQuestion").is(":checked");
            var bQuotation = $("#cbQuotation").is(":checked");

            var varObvLegend = $("#txtObvLegend").val();

            var varObvLegendDesc = $("#txtObvLegendDesc").val();
            var strEndsWith = varObvLegendDesc.lastIndexOf("\n");
            while (strEndsWith > 0) {
                if (varObvLegendDesc.length - 1 == strEndsWith) {
                    varObvLegendDesc = varObvLegendDesc.substring(0, strEndsWith);
                    strEndsWith = varObvLegendDesc.lastIndexOf("\n");
                } else {
                    break;
                }
            }
            varObvLegendDesc = varObvLegendDesc.replace(/\n/g, "<br />");

            var varRevLegend = $("#txtRevLegend").val();

            var varRevLegendDesc = $("#txtRevLegendDesc").val();
            strEndsWith = varRevLegendDesc.lastIndexOf("\n");
            while (strEndsWith > 0) {
                if (varRevLegendDesc.length - 1 == strEndsWith) {
                    varRevLegendDesc = varRevLegendDesc.substring(0, strEndsWith);
                    strEndsWith = varRevLegendDesc.lastIndexOf("\n");
                } else {
                    break;
                }
            }
            varRevLegendDesc = varRevLegendDesc.replace(/\n/g, "<br />");

            var varComments = $("#txtComments").val();
            strEndsWith = varComments.lastIndexOf("\n");
            while (strEndsWith > 0) {
                if (varComments.length - 1 == strEndsWith) {
                    varComments = varComments.substring(0, strEndsWith);
                    strEndsWith = varComments.lastIndexOf("\n");
                } else {
                    break;
                }
            }
            varComments = varComments.replace(/\n/g, "<br />");

            var varNotes = $("#txtNotes").val();
            strEndsWith = varNotes.lastIndexOf("\n");
            while (strEndsWith > 0) {
                if (varNotes.length - 1 == strEndsWith) {
                    varNotes = varNotes.substring(0, strEndsWith);
                    strEndsWith = varNotes.lastIndexOf("\n");
                } else {
                    break;
                }
            }
            varNotes = varNotes.replace(/\n/g, "<br />");

            var varReference = $("#txtReferences").val();
            strEndsWith = varReference.lastIndexOf("\n");
            while (strEndsWith > 0) {
                if (varReference.length - 1 == strEndsWith) {
                    varReference = varReference.substring(0, strEndsWith);
                    strEndsWith = varReference.lastIndexOf("\n");
                } else {
                    break;
                }
            }
            varReference = varReference.replace(/\n/g, "<br />");

            var strPedigrees = $("#txtPedigree").val();

            if (varDenomination == "None") {
                varDenomination = "";
            }
            if (varMetal == "None") {
                varMetal = "";
            }
            if (varGrade == "None") {
                varGrade = "";
            }

            var varFinalizedNotes = "";
            var varDescription = strCategoryFinalize;

            if (varDenomination != "" && varDenomination != "0") {
                if (bQuotation === true) {
                    varDescription += "'" + varDenomination + "'";
                } else {
                    varDescription += varDenomination;
                }

                if (bQuestion === true) {
                    varDescription += " (?)";
                }
            }
            if ((varMetal != "" && varMetal != "0") || (varDiameter != "" && varDiameter != "0") || (varWeight != "" && varWeight != "0" && varWeight != "0.00") || (varDie != "" && varDie != "0" && varDie != "N/A")) {
                if (varDenomination != "" && varDenomination != "0") {
                    varDescription += " (";
                } else {
                    varDescription += "(";
                }

                // METAL
                if (varMetal != "" && varMetal != "0") {
                    varDescription += varMetal;
                }

                if (varDiameter != "" && varDiameter != "0") {
                    if (varMetal != "" && varMetal != "0") {
                        varDescription += ", ";
                        varDescription += varDiameter;
                        varDescription += " mm";
                    } else {
                        varDescription += varDiameter;
                        varDescription += " mm";
                    }
                }

                if (varWeight != "" && varWeight != "0.00") {
                    if (varDiameter != "" && varDiameter != "0") {
                        varDescription += ", ";
                        varDescription += varWeight;
                        varDescription += " g";
                    } else {
                        if (varMetal != "" && varMetal != "0") {
                            varDescription += ", ";
                            varDescription += varWeight;
                            varDescription += " g";
                        } else {
                            varDescription += varWeight;
                            varDescription += " g";
                        }
                    }
                }

                if (varDie != "" && varDie != "0" && varDie != "N/A") {
                    if (varWeight != "" && varWeight != "0.00") {
                        varDescription += ", ";
                        varDescription += varDie;
                        varDescription += " h";
                    } else {
                        if (varMetal != "" && varMetal != "0") {
                            varDescription += ", ";
                            varDescription += varDie;
                            varDescription += " h";
                        } else {
                            varDescription += varDie;
                            varDescription += " h";
                        }
                    }
                }

                if (varStandard == "" && varMint == "" && varStruck == "") {
                    varDescription += "). ";
                } else {
                    varDescription += "), ";
                }
            }


            // Standard, Mint, Struck
            if (varStandard != "" && varStandard != "0") {
                varDescription += varStandard;

                if (varMint == "" || varMint == "0") {
                    if (varStruck == "" || varStruck == "0") {
                        varDescription += ". ";
                    } else {
                        varDescription += ", ";
                    }
                } else {
                    varDescription += ", ";
                }
            }

            if (varMint != "" && varMint != "0") {
                varDescription += varMint;

                if (varStruck == "" || varStruck == "0") {
                    varDescription += ". ";
                } else {
                    varDescription += ", ";
                }
            }

            if (varStruck != "" && varStruck != "0") {
                varDescription += varStruck;
                varDescription += ". ";
            }

            // OBV LEGEND OBV Description
            if (varObvLegend != "") {
                if (varObvLegendDesc != "") {
                    varDescription += varObvLegend;
                } else {
                    varDescription += varObvLegend + ".";
                }
            }
            if (varObvLegendDesc != "") {
                var strTrimmedObvDesc = varObvLegendDesc.trim();
                var strObvdot = "";
                if (strTrimmedObvDesc != "") {
                    var strEndsWith = strTrimmedObvDesc.match(".$");
                    if (strEndsWith == ".") {
                        strObvdot = "";
                    } else {
                        strObvdot = ".";
                    }
                }

                if (varObvLegend != "") {
                    varDescription += " " + varObvLegendDesc + strObvdot;
                } else {
                    varDescription += varObvLegendDesc + strObvdot;
                }
            }

            // REV LEGEND OBV Description
            if (varRevLegend != "" || varRevLegendDesc != "") {
                varDescription += " <i>Rev.</i> ";
            }
            if (varRevLegend != "") {
                if (varRevLegendDesc != "") {
                    varDescription += varRevLegend;
                } else {
                    varDescription += varRevLegend + ".";
                }
            }
            if (varRevLegendDesc != "") {
                var strTrimmedRevDesc = varRevLegendDesc.trim();
                var strRevdot = "";
                if (strTrimmedRevDesc != "") {
                    var strEndsWith = strTrimmedRevDesc.match(".$");
                    if (strEndsWith == ".") {
                        strRevdot = "";
                    } else {
                        strRevdot = ".";
                    }
                }

                if (varRevLegend != "") {
                    varDescription += " " + varRevLegendDesc + strRevdot;
                } else {
                    varDescription += varRevLegendDesc + strRevdot;
                }
            }

            // Reference
            if (varReference != "") {
                var strTrimmedRef = varReference.trim();
                var strRefdot = "";
                if (strTrimmedRef != "") {
                    var strEndsWith = strTrimmedRef.match(".$");
                    if (strEndsWith == ".") {
                        strRefdot = "";
                    } else {
                        strRefdot = ".";
                    }
                }
                varDescription += " " + varReference + strRefdot;
            }

            // Comments
            if (varComments != "") {
                var strTrimmedComments = varComments.trim();
                var strCommentdot = "";
                if (strTrimmedComments != "") {
                    var strEndsWith = strTrimmedComments.match(".$");
                    if (strEndsWith == ".") {
                        strCommentdot = "";
                    } else {
                        strCommentdot = ".";
                    }
                }
                varDescription += " " + varComments + strCommentdot;
            }

            // Defects
            if (varDefects != "") {
                var strTrimmedDefects = varDefects.trim();
                var strDefectdot = "";
                if (strTrimmedDefects != "") {
                    var strEndsWith = strTrimmedDefects.match(".$");
                    if (strEndsWith == ".") {
                        strDefectdot = "";
                    } else {
                        strDefectdot = ".";
                    }
                }
                //varDescription += " " + varDefects + strDefectdot;

                // Otherwise
                if (bOtherwise === true) {
                    strDefectdot = ",</i> ";
                    varDefects += "<i>, otherwise";
                }

                varDescription += " " + varDefects + strDefectdot;
            }

            // Grade 
            if (varGrade != "") {
                if (bOtherwise === true) {
                    if (varGrade !== "FDC" && varGrade !== "UNC") {
                        varGrade = varGrade.toLowerCase();
                    }
                }
                varDescription += " " + varGrade + ".";
            }

            var strTrimmedNotes = varNotes.trim();
            var strNotedot = "";
            if (strTrimmedNotes != "") {
                var strEndsWith = strTrimmedNotes.match(".$");
                if (strEndsWith == "." || strEndsWith == "?" || strEndsWith == "!") {
                    strNotedot = "";
                } else {
                    strNotedot = ".";
                }
            }

            var strTrimmedPedigrees = strPedigrees.trim();
            var strPedigreedot = "";
            if (strTrimmedPedigrees != "") {
                var strEndsWith = strTrimmedPedigrees.match(".$");
                if (strEndsWith == ".") {
                    strPedigreedot = "";
                } else {
                    strPedigreedot = ".";
                }
            }

            if (strPedigrees != "" || varNotes != "") {
                varDescription = varDescription + "<br /><br /><br />";
            }

            if (strPedigrees != "") {
                varDescription += "<i>" + strPedigrees + strPedigreedot + "</i>";
            }
            if (varNotes != "") {
                if (strPedigrees != "") {
                    varFinalizedNotes += "<br />";
                }
                varFinalizedNotes += varFinalizedNotes + varNotes + strNotedot;
                varDescription = varDescription + varFinalizedNotes;

            }

            if ($("#txtMultipleLots").val() !== "") {
                varDescription = $("#txtMultipleLots").val() + "<br /><br /><br /><i>" + strPedigrees + strPedigreedot + "</i>";
            }

            // Mirror
            var varPreviewDescription = varDescription;
            var strStartTag = "<span style='display: inline-block; -moz-transform: scale(-1, 1); -webkit-transform: scale(-1, 1); -o-transform: scale(-1, 1); -ms-transform: scale(-1, 1); transform: scale(-1, 1);'>";
            var strEndTag = "</span>";
            $
            tMirror.rows().every(function(rowIdx, tableLoop, rowLoop) {
                var data = this.data();

                varPreviewDescription = [varPreviewDescription.slice(0, data.End), strEndTag, varPreviewDescription.slice(data.End)].join('');
                varPreviewDescription = [varPreviewDescription.slice(0, data.Start), strStartTag, varPreviewDescription.slice(data.Start)].join('');

            });

            $("#txtMirror").html(varDescription);
            $("#divFinalized").html(varPreviewDescription);
            $("#hfFinalizedNotes").val(varFinalizedNotes);
            $("#hfFinalized").val(varDescription);

            var fRatio = 100 / 17;
            var fPercentage = 0.00;
            fPercentage = varDenomination === "" ? 0 : fRatio;
            fPercentage += varMetal === "" ? 0 : fRatio;

            fPercentage += varDiameter === "" ? 0 : fRatio;
            fPercentage += varWeight === "" ? 0 : fRatio;

            fPercentage += varStandard === "" ? 0 : fRatio;
            fPercentage += varMint === "" ? 0 : fRatio;
            fPercentage += varStruck === "" ? 0 : fRatio;
            fPercentage += varObvLegend === "" ? 0 : fRatio;
            fPercentage += varObvLegendDesc === "" ? 0 : fRatio;
            fPercentage += varRevLegend === "" ? 0 : fRatio;
            fPercentage += varRevLegendDesc === "" ? 0 : fRatio;
            fPercentage += varComments === "" ? 0 : fRatio;
            fPercentage += varReference === "" ? 0 : fRatio;

            fPercentage += varGrade === "" ? 0 : fRatio;

            fPercentage += varDefects === "" ? 0 : fRatio;
            fPercentage += varNotes === "" ? 0 : fRatio;
            fPercentage += strPedigrees === "" ? 0 : fRatio;

            $("#sPercentage").html(fPercentage.toFixed(1) + "%");



        }
        //#endregion ############### FINALIZE ################
        </script>
        <div id="ctl00_upDefault">
            {{-- <div class="page-title">
                <div class="title_left">
                    <h3> Edit selling coin </h3>
                </div>
            </div> --}}
            <div class="clearfix"></div>
            <div class="row">
                <div class="col-sm-7 col-xs-12">
                    <!-- Left column panels -->
                    <div class="x_panel">
                        <div class="x_title">
                            <h2>Inventory Information <small></small> </h2>
                            <ul class="nav navbar-right panel_toolbox">
                                <li><a class="collapse-link"><i class="fa fa-chevron-up"></i></a>
                                </li>
                            </ul>
                            <div class="clearfix"></div>
                        </div>
                        <div class="x_content" id="x_c_inventory">
                            
                            <div class="form-group">
                                <label class="control-label col-md-3 col-sm-3 col-xs-12">Category:</label>
                                <div class="col-md-9 col-sm-9 col-xs-12">
                                    <select name="ddlCategory" onchange="javascript:setTimeout('__doPostBack(\'ctl00$ddlCategory\',\'\')', 0)" id="ddlCategory" class="select2_single form-control">
                                        <option value="{{ $coin->category }}">{{ $coin->category }}</option>
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
                                    <select name="ddlCountry" onchange="" id="ddlCountry" class="select2_single form-control">
                                        <option value="{{ $coin->country }}">{{ $coin->country }}</option>
                                        <option value="MEROVINGIANS">MEROVINGIANS</option>
                                        <option value="CAROLINGIANS">CAROLINGIANS</option>
                                        <option value="AXUM">AXUM</option>
                                        <option value="CRUSADERS">CRUSADERS</option>
                                        <option value="LOMBARDS">LOMBARDS</option>
                                        <option  value="ISLAMIC">ISLAMIC</option>
                                        <option value="SUB-BYZANTINE">SUB-BYZANTINE</option>
                                        <option value="POST-SASANIAN">POST-SASANIAN</option>
                                        <option value="VANDALS">VANDALS</option>
                                        <option value="OSTROGOTHS">OSTROGOTHS</option>
                                        <option value="VISIGOTHS">VISIGOTHS</option>
                                        <option value="BURGUNDIANS">BURGUNDIANS</option>
                                        <option value="SUEVI">SUEVI</option>
                                        <option value="GEPIDS">GEPIDS</option>
                                        <option value="FRANKS">FRANKS</option>
                                        <option value="AVARS">AVARS</option>
                                        <option value=">UNCERTAIN GERMANIC TRIBES">UNCERTAIN GERMANIC TRIBES</option>
                                        <option value="UNCERTAIN TRIBES">UNCERTAIN TRIBES</option>
                                    </select>
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="control-label col-md-3 col-sm-3 col-xs-12">Region:</label>
                                <div class="col-md-9 col-sm-9 col-xs-12">
                                    <select name="ddlRegion" onchange="javascript:setTimeout('__doPostBack(\'ctl00$ddlRegion\',\'\')', 0)" id="ddlRegion" class="select2_single form-control">
                                        <option value="{{ $coin->region }}"> {{ $coin->region }} </option>
                                        <option value="'Abbasid Caliphate">'Abbasid Caliphate</option>
                                        <option value="al-Andalus (Spain)">al-Andalus (Spain)</option>
                                        <option value="al-Maghreb (North Africa)">al-Maghreb (North Africa)</option>
                                        <option value="Anatolia & al-Jazira (Post-Mongol)">Anatolia & al-Jazira (Post-Mongol)</option>
                                        <option value="Anatolia & al-Jazira (Post-Seljuk)">Anatolia & al-Jazira (Post-Seljuk)</option>
                                        <option value="Arabia">Arabia</option>
                                        <option value="Ayyubids">Ayyubids</option>
                                        <option value="Caucasus (Post-Mongol)">Caucasus (Post-Mongol)</option>
                                        <option value="Caucasus (Post-Seljuk)">Caucasus (Post-Seljuk)</option>
                                        <option value="Caucasus (Pre-Seljuq)">Caucasus (Pre-Seljuq)</option>
                                        <option value="Egypt & Syria (Pre-Fatimid)">Egypt & Syria (Pre-Fatimid)</option>
                                        <option value="Fatimids">Fatimids</option>
                                        <option value="Islamic Seals">Islamic Seals</option>
                                        <option value="Islamic Weights">Islamic Weights</option>
                                        <option value="Mamluks">Mamluks</option>
                                        <option value="Mongols">Mongols</option>
                                        <option value="Ottoman Empire">Ottoman Empire</option>
                                        <option value="Persia (Post-Mongol)">Persia (Post-Mongol)</option>
                                        <option value="Persia (Post-Seljuk)">Persia (Post-Seljuk)</option>
                                        <option value="Persia (Pre-Seljuq)">Persia (Pre-Seljuq)</option>
                                        <option value="Seljuks">Seljuks</option>
                                        <option value="Syria & al-Jazira (Pre-Seljuq)">Syria & al-Jazira (Pre-Seljuq)</option>
                                        <option value="Time of Muhammad & the Rashidun">Time of Muhammad & the Rashidun</option>
                                        <option value="Time of the Rashidun">Time of the Rashidun</option>
                                        <option  value="Umayyad Caliphate">Umayyad Caliphate</option>
                                    </select>
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="control-label col-md-3 col-sm-3 col-xs-12">City:</label>
                                <div class="col-md-7 col-sm-7 col-xs-12">
                                    <select name="ddlCity" " id="ddlCity" class="select2_single form-control">
                                        <option value="{{ $coin->city }}"> {{ $coin->city }} </option>
                                        <option  value="n/a">n/a</option>
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
                                    <select name="ddlRuler" onchange="javascript:setTimeout('__doPostBack(\'ctl00$ddlRuler\',\'\')', 0)" id="ddlRuler" class="select2_single form-control">
                                        <option value="{{ $coin->ruler }}">{{ $coin->ruler }}</option>
                                        <option value="Mu'awiya I ibn Abi Sufyan"> Mu'awiya I ibn Abi Sufyan</option>
                                        <option value="Yazid I ibn Mu'awiya"> Yazid I ibn Mu'awiya</option>
                                        <option value="'Abd Allah ibn al-Zubayr">'Abd Allah ibn al-Zubayr</option>
                                        <option value="'Abd Allah ibn al-Zubayr"> 'Abd Allah ibn al-Zubayr</option>
                                        <option value="Mu'awiya II ibn Yazid"> Mu'awiya II ibn Yazid</option>
                                        <option value="Marwan I ibn Hakam">Marwan I ibn Hakam</option>
                                        <option value=" Marwan I ibn Hakam"> Marwan I ibn Hakam</option>
                                        <option value="'Abd al-Malik ibn Marwan"> 'Abd al-Malik ibn Marwan</option>
                                        <option value="al-Qatari ibn al-Fuja'a">al-Qatari ibn al-Fuja'a</option>
                                        <option value="'Atiya ibn al-Aswad">'Atiya ibn al-Aswad</option>
                                        <option value="'Atiya ibn al-Aswad">'Atiya ibn al-Aswad</option>
                                        <option value="Anonymous issue">Anonymous issue</option>
                                        <option value="Ibn al-Ash'ath">Ibn al-Ash'ath</option>
                                        <option value="Uncertain period (pre-reform)">Uncertain period (pre-reform)</option>
                                        <option value="al-Walid I ibn 'Abd al-Malik">al-Walid I ibn 'Abd al-Malik</option>
                                        <option value="al-Walid I ibn 'Abd al-Malik">al-Walid I ibn 'Abd al-Malik</option>
                                        <option value="Suleiman ibn 'Abd al-Malik">Suleiman ibn 'Abd al-Malik</option>
                                        <option value="'Umar ibn Abd al-Aziz">'Umar ibn Abd al-Aziz</option>
                                        <option value="Yazid II ibn 'Abd al-Malik">Yazid II ibn 'Abd al-Malik</option>
                                        <option value="Yazid II ibn 'Abd al-Malik or Hisham ibn 'Abd al-Malik">Yazid II ibn 'Abd al-Malik or Hisham ibn 'Abd al-Malik</option>
                                      
                                        <option value="Hisham ibn 'Abd al-Malik">Hisham ibn 'Abd al-Malik</option>
                                      
                                        <option value="al-Walid II ibn Yazid"> al-Walid II ibn Yazid</option>
                                        <option value="Yazid III ibn al-Walid"> Yazid III ibn al-Walid</option>
                                        <option value="Ibrahim ibn al-Walid"> Ibrahim ibn al-Walid</option>
                                        <option value="Marwan II ibn Muhammad"> Marwan II ibn Muhammad</option>
                                        <option value="Uncertain period (post-reform)">Uncertain period (post-reform)</option>
                                    </select>
                                </div>
                                <div class="checkbox col-md-2 col-sm-2 col-xs-12">
                                    <label>
                                        <div class="icheckbox_flat-green" style="position: relative;">
                                            <input name="cbQuestionRuler" type="checkbox" id="cbQuestionRuler" class="flat" style="position: absolute; opacity: 0;" value="" />
                                            <ins class="iCheck-helper" style="position: absolute; top: 0%; left: 0%; display: block; width: 100%; height: 100%; margin: 0px; padding: 0px; background: rgb(255, 255, 255) none repeat scroll 0% 0%; border: 0px none; opacity: 0;"></ins>
                                        </div>
                                        (?)
                                    </label>
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="control-label col-md-3 col-sm-3 col-xs-12">Date:</label>
                                <div class="col-md-9 col-sm-9 col-xs-12">
                                    <input name="txtDate" type="text" value="{{ $coin->date }}" id="txtDate" class="form-control" placeholder="Date" />
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="control-label col-md-3 col-sm-3 col-xs-12">Denomination:</label>
                                <div class="col-md-5 col-sm-5 col-xs-12">
                                    <select name="ddlDenomination" id="ddlDenomination" class="select2_single form-control">
                                        <option value="{{ $coin->denomination }}">{{ $coin->denomination }}</option>
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
                                        <option value="{{ $coin->metal }}">{{ $coin->metal }}</option>
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
                                    <input name="txtDiameter" type="text" value="{{ $coin->diameter }}" id="txtDiameter" class="form-control" placeholder="mm" />
                                </div>
                                <label class="control-label col-md-1 col-sm-1 col-xs-12">Weight:</label>
                                <div class="col-md-2 col-sm-2 col-xs-12">
                                    <input name="txtWeight" type="text" value="{{ $coin->weight }}" id="txtWeight" class="form-control" placeholder="g" />
                                </div>
                                <label class="control-label col-md-2 col-sm-2 col-xs-12">Die Axis:</label>
                                <div class="col-md-2 col-sm-2 col-xs-12">
                                    <select name="ddlDie" id="ddlDie" class="select2_single form-control">
                                        <option value="{{ $coin->die_axis }}">{{ $coin->die_axis }}</option>
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
                                    <input name="txtStandard" type="text" id="txtStandard" value="{{ $coin->standard }}" class="form-control" placeholder="Standard or Type" />
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="control-label col-md-3 col-sm-3 col-xs-12">Mint / Magistrate:</label>
                                <div class="col-md-9 col-sm-9 col-xs-12">
                                    <input name="txtMint" value="{{ $coin->mint }}" type="text" value="" id="txtMint" class="form-control" placeholder="Mint / Magistrate" />
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="control-label col-md-3 col-sm-3 col-xs-12">Struck dates:</label>
                                <div class="col-md-9 col-sm-9 col-xs-12">
                                    <input name="txtStruck" value="{{ $coin->struck_dates }}" type="text" value="" id="txtStruck" class="form-control" placeholder="Struck dates" />
                                </div>
                            </div>
                           {{--  <div class="form-group">
                                <label class="control-label col-md-3 col-sm-3 col-xs-12">Upload coin picture</label>
                                <div class="col-md-9 col-sm-9 col-xs-12">
                                    <input name="image" type="file" value="" id="ctl00$image" class="form-control" />
                                </div>
                            </div> --}}
                            <div class="ln_solid"></div>
                            <div class="form-group">
                                <label class="control-label col-md-3 col-sm-3 col-xs-12">Obv. legend:</label>
                                <div class="col-md-9 col-sm-9 col-xs-12">
                                    <textarea name="txtObvLegend" rows="2" cols="20" id="txtObvLegend" class="form-control resizable_textarea" placeholder="Obverse legend">{{ $coin->obv_legend }}
                                    </textarea>
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="control-label col-md-3 col-sm-3 col-xs-12">Obv. description:</label>
                                <div class="col-md-9 col-sm-9 col-xs-12">
                                    <textarea name="txtObvLegendDesc" rows="2" cols="20" id="txtObvLegendDesc" class="form-control resizable_textarea" placeholder="Obverse description">{{ $coin->obv_desc }}
                                    </textarea>
                                </div>
                            </div>
                            <div class="ln_solid"></div>
                            <div class="form-group">
                                <label class="control-label col-md-3 col-sm-3 col-xs-12">Rev. legend:</label>
                                <div class="col-md-9 col-sm-9 col-xs-12">
                                    <textarea name="txtRevLegend" rows="2" cols="20" id="txtRevLegend" class="form-control resizable_textarea" placeholder="Reverse legend">{{ $coin->rev_legend }}
                                    </textarea>
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="control-label col-md-3 col-sm-3 col-xs-12">Rev. description:</label>
                                <div class="col-md-9 col-sm-9 col-xs-12">
                                    <textarea name="txtRevLegendDesc" rows="2" cols="20" id="txtRevLegendDesc" class="form-control resizable_textarea" placeholder="Reverse description">{{ $coin->rev_desc }}
                                    </textarea>
                                </div>
                            </div>
                            <div class="ln_solid"></div>
                            <div class="form-group">
                                <label class="control-label col-md-3 col-sm-3 col-xs-12">References:</label>
                                <div class="col-md-9 col-sm-9 col-xs-12">
                                    <textarea name="txtReferences" rows="2" cols="20" id="txtReferences" class="form-control resizable_textarea" placeholder="References"> {{ $coin->references }} </textarea>
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="control-label col-md-3 col-sm-3 col-xs-12">Comments:</label>
                                <div class="col-md-9 col-sm-9 col-xs-12">
                                    <textarea name="txtComments" rows="2" cols="20" id="txtComments" class="form-control resizable_textarea" placeholder="Comments">{{ $coin->comments }}
                                    </textarea>
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="control-label col-md-3 col-sm-3 col-xs-12">Defects:</label>
                                <div class="col-md-9 col-sm-9 col-xs-12">
                                    <input name="txtToning" type="text" id="txtToning" value="{{ $coin->defects }}" class="form-control" placeholder="Defects" />
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="control-label col-md-3 col-sm-3 col-xs-12">Grade:</label>
                                <div class="col-md-6 col-sm-6 col-xs-12">
                                    <select name="ddlGrade" id="ddlGrade" class="select2_single form-control">
                                        <option value="{{ $coin->grade }}">{{ $coin->grade }}</option>
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
                                    <textarea name="txtPedigree" rows="2" cols="20" id="txtPedigree" class="form-control resizable_textarea" placeholder="Pedigree">{{ $coin->pedigree }}
                                    </textarea>
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="control-label col-md-3 col-sm-3 col-xs-12">Notes:</label>
                                <div class="col-md-9 col-sm-9 col-xs-12">
                                    <textarea name="txtNotes" rows="2" cols="20" id="txtNotes" class="form-control resizable_textarea" placeholder="Notes">{{ $coin->notes }}
                                    </textarea>
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="control-label col-md-3 col-sm-3 col-xs-12">Check:</label>
                                <div class="col-md-9 col-sm-9 col-xs-12">
                                    <select name="ddlCondition" id="ctl00_ddlCondition" class="select2_single form-control">
                                        <option  value="None">None</option>
                                        <option value="Finalized">Finalized</option>
                                        <option value="Unfinished">Unfinished</option>
                                    </select>
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="control-label col-md-3 col-sm-3 col-xs-12">Multiple lots:</label>
                                <div class="col-md-9 col-sm-9 col-xs-12">
                                    <textarea name="txtMultipleLots" rows="2" cols="20" id="txtMultipleLots"  class="form-control resizable_textarea" placeholder="Multiple Lots">{{ $coin->multiple_lot }}
                                    </textarea>
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="control-label col-md-3 col-sm-3 col-xs-12">Header:</label>
                                <div class="col-md-9 col-sm-9 col-xs-12">
                                    <input name="txtHeader" value="{{ $coin->header }}" type="text" id="ctl00_txtHeader" class="form-control" placeholder="Header" />
                                </div>
                            </div>
                            <div class="ln_solid"></div>
                            <div class="form-group">
                                <label class="control-label col-md-3 col-sm-3 col-xs-12">Plain HTML:</label>
                                <div class="col-md-9 col-sm-9 col-xs-12">
                                    <div class="col-md-12 col-sm-12 col-xs-12">
                                        <textarea name="txtMirror" rows="2" cols="20" id="txtMirror" class="form-control-special" placeholder="Finalized HTML">
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
                            </div>
                            <div class="form-group">
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
                            </div>
                            <div class="ln_solid"></div>
                            <div class="form-group">
                                <label class="control-label col-md-3 col-sm-3 col-xs-12">Collection:</label>
                                <div class="col-md-9 col-sm-9 col-xs-12">
                                    <select name="ddlCollection" id="ddlCollection" class="select2_single form-control">
                                        <option  value="n/a">n/a</option>
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
                    <div class="x_panel" id="pNavigation">
                        <div class="x_title">
                            <h2>Inventory <small>
                            #81 of 81</small></h2>
                            <ul class="nav navbar-right panel_toolbox" id="aNavigationCollapse">
                                <li><a class="collapse-link"><i class="fa fa-chevron-up"></i></a>
                                </li>
                            </ul>
                            <div class="clearfix"></div>
                        </div>
                        <div class="x_content" id="x_c_navigation">
                            <label class="control-label">Inventory Number</label>
                            <div>
                                <input name="ctl00$txtInventoryID" type="text" value="{{ $coin->id }}" id="txtInventoryID" class="form-control" placeholder="Inventory number" />
                            </div>
                            <label class="control-label">Navigation</label>
                            <div class="form-group">
                                <div class="fa-hover col-md-1 col-sm-1 col-xs-12">
                                    <a id="ctl00_lbBack" class="fa fa-step-backward fa-3x" href="javascript:__doPostBack(&#39;ctl00$lbBack&#39;,&#39;&#39;)"></a>
                                </div>
                                <div class="col-md-10 col-sm-10 col-xs-12">
                                    <div id="iInventories"></div>
                                </div>
                                <div class="fa-hover col-md-1 col-sm-1 col-xs-12">
                                    <a id="ctl00_lbForward" class="fa fa-step-forward fa-3x" href="javascript:__doPostBack(&#39;ctl00$lbForward&#39;,&#39;&#39;)"></a>
                                </div>
                            </div>
                            <div class="ln_solid"></div>
                            <div class="form-group">
                               
                                <div class="col-md-6 col-sm-6 col-xs-12">
                                    <input type="submit" name="ctl00$btnSetInventory" value="Edit coin details" id="btnSetInventory" class="btn btn-success pull-" />
                                    {{-- <input type="submit" name="ctl00$btnCancel" value="Cancel" id="ctl00_btnCancel" class="btn btn-primary pull-right" /> --}}
                                </div>
                            </div>
                        </div>
                    </div>
                  {{--   <div class="x_panel" id="pFinalized">
                        <div class="x_title">
                            <h2>Finalized <small><span id="sPercentage"></span></small></h2>
                            <ul class="nav navbar-right panel_toolbox">
                                <li><a class="collapse-link"><i class="fa fa-chevron-up"></i></a>
                                </li>
                            </ul>
                            <div class="clearfix"></div>
                        </div>
                        <div class="x_content" id="x_c_finalized">
                            <div class="col-md-12 col-sm-12 col-xs-12">
                                <div class="col-md-1 col-xs-1 text-right">
                                    <i id="ctl00_iLeftArrow" class="glyphicon glyphicon-menu-left" style="font-size: 2.5em; margin-top: 9vh; cursor: pointer;"></i>
                                </div>
                                <div class="col-md-10 col-sm-10 col-xs-10" id="divPreview">
                                    <a href="/source/images/inventory/19479g00.jpg" id="aPreview" data-fancybox="images" data-caption="Preview">
                                    <img id="iPreview" class="img-responsive" src="/source/images/inventory/19479g00.jpg" />
                                </a>
                                    <a href="javascript:;" id="a1" data-fancybox="images" data-caption="Preview">
                                    <img id="iWebImage" class="img-responsive" />
                                </a>
                                </div>
                                <div class="col-md-1 col-xs-1">
                                    <i id="ctl00_iRightArrow" class="glyphicon glyphicon-menu-right" style="font-size: 2.5em; margin-top: 9vh; cursor: pointer;"></i>
                                </div>
                                <div class="col-md-12 col-sm-12 col-xs-12">
                                    <div class="col-md-12 col-sm-12 col-xs-12" style="display: flex; flex-direction: column;">
                                        <div id="divFinalized" style="margin-top: 10px; text-align: justify; text-justify: auto; padding-right: 10px;"><b>ISLAMIC, Umayyad Caliphate. <i>al-Walid I ibn 'Abd al-Malik</i>, AH 86-96 / AD 705-715.</b> Dirham (Silver, 26 mm, 2.87 g, 7 h), Wasit, dated AH 93 (AD 710/11). Album 128. Good extremely fine.</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
 --}}
                    
                </div>
            </div>


        </div>
        <style>
            .div-toolbar {
        background-color: #e3f7fc;
        display: none;
        box-shadow: 2px 2px 2px 0px rgba(0,0,0,0.3);
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
        -webkit-box-shadow: inset 0 1px 1px rgba(0,0,0,.075);
        box-shadow: inset 0 1px 1px rgba(0,0,0,.075);
        -webkit-transition: border-color ease-in-out .15s,-webkit-box-shadow ease-in-out .15s;
        -o-transition: border-color ease-in-out .15s,box-shadow ease-in-out .15s;
        transition: border-color ease-in-out .15s,box-shadow ease-in-out .15s;
        min-height: 54px;
        height: auto;
    }

        .form-control-special:focus {
            border-color: #66afe9;
            outline: 0;
            -webkit-box-shadow: inset 0 1px 1px rgba(0,0,0,.075),0 0 8px rgba(102,175,233,.6);
            box-shadow: inset 0 1px 1px rgba(0,0,0,.075),0 0 8px rgba(102,175,233,.6);
        }
</style>
        <input type="hidden" name="hfUser" id="hfUser" value="GSs4TBYENCJsdFzhoO5hsg==" />
        <input type="hidden" name="hfPusherKey" id="hfPusherKey" value="6fd44c12f55bf33ed9ff" />
        <script type="text/javascript">
        //<![CDATA[

        theForm.oldSubmit = theForm.submit;
        theForm.submit = WebForm_SaveScrollPositionSubmit;

        theForm.oldOnSubmit = theForm.onsubmit;
        theForm.onsubmit = WebForm_SaveScrollPositionOnSubmit;
        //]]>
        </script>
    </form>
</div>
<!-- /page content -->
@stop


@section('title')
    Atnumis &middot Edit coin details.
@stop