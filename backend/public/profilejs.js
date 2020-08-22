<script>
    var tBidinfo;

    function pageLoad() {
        $(".indicator").hide();
        $(".indicatorConsignments").hide();
        $(".indicatorWatchlist").hide();

        checkSize();
        $(window).resize(checkSize);

        $('input.flat').iCheck({
            checkboxClass: "icheckbox_flat-blue",
            radioClass: "iradio_flat-blue"
        });

        Dropzone.autoDiscover = false;
        //Simple Dropzonejs 
        $("#dZUpload").dropzone({
            url: "/consign/upload",
            acceptedFiles: ".png,.jpg,.gif,.png,.jpeg",
            maxFiles: 10,
            maxFilesize: 10,
            addRemoveLinks: true,
            parallelUploads: 1,
            success: function (file, response) {
                var imgName = response;
                $("#hfUploads").val($("#hfUploads").val() + ";" + imgName);
                file.previewElement.classList.add("dz-success");
            },
            error: function (file, response) {
                $(file.previewElement).find('.dz-error-message').text(response);
                file.previewElement.classList.add("dz-error");
            }
        });

        if ($("#txtShippingCompany").val() !== "" || $("#txtShippingFirstname").val() !== "" || $("#txtShippingLastname").val() !== "" || $("#txtShippingStreet").val() !== "") {
            $("#cbShipping").iCheck('check');
            $("#divShipping").slideToggle();
        }

        $('input.flat').on('ifUnchecked', function (event) {
            switch (this.id) {
                case "cbShipping":
                    $("#divShipping").slideToggle();
                    break;
            }
        });

        $('input.flat').on('ifChecked', function (event) {
            switch (this.id) {
                case "cbShipping":
                    $("#divShipping").slideToggle();
                    break;
            }
        });

        $(document).on("click", ".div-numberofbids", function (e) {
            e.preventDefault();
            var PK_ID = $(this).attr("PK_ID");

            if ($(".time-left[PK_ID='" + PK_ID + "']").data("withdrawn") === false) {
                var frameSrc = "/web/BidHistory.aspx?id=" + PK_ID + "&lang=" + $("#hfCC").val();
                $("#mBids").find("iframe").attr("src", frameSrc);
                $("#mBids").modal();
            }
        });

        $("#txtPhoneNumber, #txtFaxNumber").focusout(function () {
            $("#txtPhoneNumber").val($("#txtPhoneNumber").val().replace(/\s/g, ""));
            $("#txtFaxNumber").val($("#txtFaxNumber").val().replace(/\s/g, ""));
        });

        $(".btn-consign").click(function () {
            $("#loading-indicator").show();
            var PK_ID = $(this).attr("PK_ID");

            $.ajax({
                type: "POST",
                url: "/source/components/LeuService.asmx/MyLeuConsign",
                data: "{intLotID:'" + PK_ID + "'}",
                dataType: "json",
                contentType: "application/json; charset=utf-8",
                success: function (response) {
                    $("a[PK_ID='" + PK_ID + "']").hide();
                    $(".div-consigned[PK_ID='" + PK_ID + "']").show();

                    $("#loading-indicator").hide();
                },
                error: function (error) {
                    console.log(error);
                    $("#loading-indicator").hide();
                }
            });
        });

        $("#ddlMyBidsAuctions").change(function () {
            $("#divLots").empty();
            $("#pTopPaging, #pBottomPaging").twbsPagination("destroy");
            $(".div-mybidstotal").hide();
            GetMyBids(1);
        });
        $("#ddlConsignorAuctions").change(function () {
            $("#divMyConsignments").empty();
            $("#divMyConsignmentsTotals").hide();
            GetMyConsignments();
        });

        $("#ddlWatchlistAuctions").change(function () {
            $("#divWatchlistLots").empty();
            $("#pWatchlistTopPaging, #pWatchlistBottomPaging").twbsPagination("destroy");
            GetMyWatchlist(1);
        });

    }


    $(document).ready(function () {
        var intAuctionID = $("#ddlMyBidsAuctions").val();

        var url = window.location.href;
        var activeTab = "amybids";
        if (url.indexOf("#") > -1) {
            activeTab = "amy" + url.substring(url.indexOf("#") + 1);
            $("#" + activeTab).tab("show");
        }

        switch (activeTab) {
            case "amybids":
                if ($("#ddlMyBidsAuctions").val() !== "") {
                    $("#divLots").empty();
                    $("#pTopPaging, #pBottomPaging").twbsPagination("destroy");
                    $(".div-mybidstotal").hide();
                    GetMyBids(1);
                }
                break;
            case "amyconsignments":
                if ($("#ddlConsignorAuctions").val() !== "") {
                    $("#divMyConsignments").empty();
                    $("#divMyConsignmentsTotals").hide();
                    GetMyConsignments();
                }
                break;
            case "amywatchlist":
                if ($("#ddlWatchlistAuctions").val() !== "") {
                    $("#divWatchlistLots").empty();
                    $("#pWatchlistTopPaging, #pWatchlistBottomPaging").twbsPagination("destroy");
                    GetMyWatchlist(1);
                }
                break;
        }

        $(".nav-tabs > li > a").click(function () {
            var selectedID = $(this).attr("id");
            switch (selectedID) {
                case "amybids":
                    if ($("#ddlMyBidsAuctions").val() !== "") {
                        $("#divWatchlistLots").empty();
                        $("#pWatchlistTopPaging, #pWatchlistBottomPaging").twbsPagination("destroy");
                        $("#divLots").empty();
                        $("#pTopPaging, #pBottomPaging").twbsPagination("destroy");
                        $(".div-mybidstotal").hide();
                        GetMyBids(1);
                    }
                    break;
                case "amyconsignments":
                    if ($("#ddlConsignorAuctions").val() !== "") {
                        $("#divMyConsignments").empty();
                        $("#divMyConsignmentsTotals").hide();
                        GetMyConsignments();
                    }
                    break;
                case "amywatchlist":
                    if ($("#ddlWatchlistAuctions").val() !== "") {
                        $("#divLots").empty();
                        $("#pTopPaging, #pBottomPaging").twbsPagination("destroy");
                        $(".div-mybidstotal").hide();
                        $("#divWatchlistLots").empty();
                        $("#pWatchlistTopPaging, #pWatchlistBottomPaging").twbsPagination("destroy");
                        GetMyWatchlist(1);
                    }
                    break;
                default:
                    $("#divLots").empty();
                    $("#pTopPaging, #pBottomPaging").twbsPagination("destroy");
                    $(".div-mybidstotal").hide();
                    $("#divWatchlistLots").empty();
                    $("#pWatchlistTopPaging, #pWatchlistBottomPaging").twbsPagination("destroy");

                    $("#divWatchlistLots").empty();
                    $("#pWatchlistTopPaging, #pWatchlistBottomPaging").twbsPagination("destroy");
                    $("#divLots").empty();
                    $("#pTopPaging, #pBottomPaging").twbsPagination("destroy");
                    $(".div-mybidstotal").hide();
                    break;
            }

        });

    });

    function changePage(page) {
        $("#pTopPaging, #pBottomPaging").twbsPagination("disable");
        GetMyBids(page);
    }
    function changeWatchlistPage(page) {
        $("#pTopPaging, #pBottomPaging").twbsPagination("disable");
        GetMyWatchlist(page);
    }

    function checkSize() {
        if (window.matchMedia("(min-width: 1024px)").matches) {
            $(".dropdown_chosen").select2();
        } else {
            try {
                $(".dropdown_chosen").select2("destroy");
            }
            catch (err) {
                console.log(err);
            }
        }
    }

    var checkEmail = function () {
        if ($("#hfExistingEmail").val() === $("#txtEmail").val()) {
            $("#txtEmailRepeat").val($("#hfExistingEmail").val());
        }
        else {
            $("#txtEmailRepeat").val("");
        }

    };
    

    function checkUsername() {
        return $.ajax({
            type: "POST",
            url: "/source/components/LeuService.asmx/CheckUsername",
            data: "{strUsername:'" + $("#txtUsername").val() + "'}",
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            success: function (response) {
                $("#hfUsername").val(response.d);
            },
            error: function (error) {
                console.log(error);
            }
        });
    }

    function GetMyBids(intPage) {
        var intAuctionID = $("#ddlMyBidsAuctions").val();
        if (intAuctionID !== "" && intAuctionID !== null) {
            return $.ajax({
                type: "POST",
                url: "/source/components/LeuService.asmx/GetMyBids",
                data: "{intAuctionID:'" + $("#ddlMyBidsAuctions").val() + "', UID:'" + $("#hfUID").val() + "', intPage:'" + intPage + "', strCulture:'" + $("#hfCC").val() + "'}",
                dataType: "json",
                contentType: "application/json; charset=utf-8",
                beforeSend: function () {
                    $("#divNoLots").hide();
                    $("#divLots").empty();
                    $(".indicator").show();
                },
                success: function (response) {
                    var json = JSON.parse(response.d);
                    if (json.TotalFiltered !== null) {
                        $(".div-mybidstotal").show();
                        $("#divLots").append(json.HTMLLots);

                        $(".time-left").each(function () {
                            $lot = $(this);

                            var elementWatcher = scrollMonitor.create($lot);
                            elementWatcher.enterViewport(function () {
                                $(this.watchItem).addClass("viw-in");
                                UpdateTime($(this.watchItem));
                            });
                            elementWatcher.exitViewport(function () {
                                $(this.watchItem).removeClass("viw-in");
                            });
                        });

                        var totalPages = Math.ceil((json.TotalFiltered / 100));
                        $("#pTopPaging, #pBottomPaging").twbsPagination("destroy");
                        $("#pTopPaging, #pBottomPaging").twbsPagination({
                            startPage: intPage,
                            totalPages: totalPages,
                            visiblePages: totalPages,
                            paginationClass: '',
                            initiateStartPageClick: false,
                            prev: '<span aria-hidden="true">&laquo;</span>',
                            next: '<span aria-hidden="true">&raquo;</span>',
                            onPageClick: function (event, page) {
                                changePage(page);
                            }
                        });

                        UpdateInformation(intAuctionID);
                        $(".indicator").hide();

                    }
                    else {
                        $(".div-mybidstotal").hide();
                        $(".indicator").hide();
                        $("#divNoLots").show();
                    }

                },
                error: function (error) {
                    console.log(error);
                }

            });
        }
    }

    function GetMyConsignments() {
        var intAuctionID = $("#ddlConsignorAuctions").val();
        if (intAuctionID !== "" && intAuctionID !== null) {
            return $.ajax({
                type: "POST",
                url: "/source/components/LeuService.asmx/GetMyConsignments",
                data: "{intAuctionID:'" + intAuctionID + "', UID:'" + $("#hfUID").val() + "', strCulture:'" + $("#hfCC").val() + "'}",
                dataType: "json",
                contentType: "application/json; charset=utf-8",
                beforeSend: function () {
                    $("#divNoConsignments").hide();
                    $("#divMyConsignments").empty();
                    $(".indicatorConsignments").show();
                },
                success: function (response) {
                    var json = JSON.parse(response.d);

                    if (json.TotalFiltered !== null) {
                        $("#divMyConsignmentsTotals").show();
                        $("#divMyConsignments").append(json.HTMLLots);
                        $(".span-numberoflots").html(json.TotalFiltered);
                        $(".span-totalstarting").html(json.TotalStarting + " CHF");
                        $(".span-totalcurrent").html(json.TotalCurrent + " CHF");
                        $(".span-withbids").html(json.WithBids);

                        // File
                        $("#aConsSheet").attr("href", json.ConsSheet);
                        $("#aConsSheetText").attr("href", json.ConsSheet);
                        if (json.ConsSheet === "javascript:;")
                        {
                            $("#aConsSheet").css("cursor", "default");
                            $("#aConsSheetText").css("cursor", "default");
                            $("#aConsSheetText").css("text-decoration", "none");
                        }
                        else
                        {
                            $("#aConsSheet").css("cursor", "pointer");
                            $("#aConsSheetText").css("cursor", "pointer");
                        }
                        
                        $("#aConsReport").attr("href", json.ConsReport);
                        $("#aConsReportText").attr("href", json.ConsReport);
                        if (json.ConsReport === "javascript:;") {
                            $("#aConsReport").css("cursor", "default");
                            $("#aConsReportText").css("cursor", "default");
                            $("#aConsReportText").css("text-decoration", "none");
                        }
                        else
                        {
                            $("#aConsReport").css("cursor", "pointer");
                            $("#aConsReportText").css("cursor", "pointer");
                        }
                        if (json.Realized === true)
                        {
                            $("#spanTotalCurrent").html($("#hfTotalHammer").val());
                        }

                        $(".indicatorConsignments").hide();

                    }
                    else {
                        $("#divMyConsignmentsTotals").hide();
                        $(".indicatorConsignments").hide();
                        $("#divNoConsignments").show();
                    }

                },
                error: function (error) {
                    console.log(error);
                }

            });
        }
    }

    function GetMyWatchlist(intPage) {
        var intAuctionID = $("#ddlWatchlistAuctions").val();
        if (intAuctionID !== "" && intAuctionID !== null) {
            return $.ajax({
                type: "POST",
                url: "/source/components/LeuService.asmx/GetMyWatchlist",
                data: "{intAuctionID:'" + intAuctionID + "', UID:'" + $("#hfUID").val() + "', intPage:'" + intPage + "', strCulture:'" + $("#hfCC").val() + "'}",
                dataType: "json",
                contentType: "application/json; charset=utf-8",
                beforeSend: function () {
                    $("#divWatchlistNoLots").hide();
                    $("#divWatchlistLots").empty();
                    $(".indicatorWatchlist").show();
                },
                success: function (response) {
                    var json = JSON.parse(response.d);
                    if (json.TotalFiltered !== null) {
                        $("#divWatchlistLots").append(json.HTMLLots);

                        $(".time-left").each(function () {
                            $lot = $(this);

                            var elementWatcher = scrollMonitor.create($lot);
                            elementWatcher.enterViewport(function () {
                                $(this.watchItem).addClass("viw-in");
                                UpdateTime($(this.watchItem));
                            });
                            elementWatcher.exitViewport(function () {
                                $(this.watchItem).removeClass("viw-in");
                            });
                        });

                        var totalPages = Math.ceil((json.TotalFiltered / 100));
                        $("#pWatchlistTopPaging, #pWatchlistBottomPaging").twbsPagination("destroy");
                        $("#pWatchlistTopPaging, #pWatchlistBottomPaging").twbsPagination({
                            startPage: intPage,
                            totalPages: totalPages,
                            visiblePages: totalPages,
                            paginationClass: '',
                            initiateStartPageClick: false,
                            prev: '<span aria-hidden="true">&laquo;</span>',
                            next: '<span aria-hidden="true">&raquo;</span>',
                            onPageClick: function (event, page) {
                                changeWatchlistPage(page);
                            }
                        });

                        $(".indicatorWatchlist").hide();

                    }
                    else {
                        $(".indicatorWatchlist").hide();
                        $("#divWatchlistNoLots").show();
                    }

                },
                error: function (error) {
                    console.log(error);
                }
            });
        }
    }


    function UpdateInformation(intAuctionID) {
        return $.ajax({
            type: "POST",
            url: "/source/components/LeuService.asmx/GetMyBidsInformation",
            data: "{intAuctionID:'" + intAuctionID + "'}",
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            success: function (response) {
                var json = JSON.parse(response.d);

                $(".span-higestbidder").html(json.HigestBidder);
                $(".span-totalcurrent").html(json.TotalCurrent + " CHF");
                var intRemainingCredits = json.CreditLimit - json.TotalMaximum;
                $(".span-lotsbidon").html(json.LotsBidOn);
                $(".span-totalmaximum").html(json.TotalMaximum + " CHF");
                if (json.CreditLimit === 0) {
                    $(".span-creditlimit").html($("#hfCreditlimitUnlimited").val());
                    $(".span-remainingcredits").html($("#hfCreditlimitUnlimited").val());
                }
                else {
                    $(".span-creditlimit").html(json.CreditLimit + " CHF");
                    $(".span-remainingcredits").html(intRemainingCredits + " CHF");
                }

            },
            error: function (error) {
                console.log(error);
            }
        });
    }

    // Sys.WebForms.PageRequestManager.getInstance().add_beginRequest(BeginRequestHandler);
    // Sys.WebForms.PageRequestManager.getInstance().add_endRequest(EndRequestHandler);
    function BeginRequestHandler(sender, args) {
        $("#loading-indicator").show();
    }
    function EndRequestHandler(sender, args) {
        $("#loading-indicator").hide();
    }

</script>