$(document).ready(function(){

    $('.payWithRazorpay').click(function(e){
        e.preventDefault();

        var fname = $("[name='fname']").val();
        var lname = $("[name='lname']").val();
        var email = $("[name='email']").val();
        var phone = $("[name='phone']").val();
        var address = $("[name='address']").val();
        var city = $("[name='city']").val();
        var state = $("[name='state']").val();
        var country = $("[name='country']").val();
        var pincode = $("[name='pincode']").val();
        var token = $("[name="csrfmiddlewaretoken"]").val();

        if(fname=="" || lname=="" || email=="" || phone=="" || address=="" || city==""|| state=="" || country=="" || pincode==""){
            alert("All fields are mandatory");
            swal("Alert!", "All field are mandatory!", "error");
            return false;
        }
        else
        {
            $.ajax({
                method: "GET",
                url: "/proceed-to-pay",
                success: function(response){
                    //console.log(response);
                    var options = {
                        "key": "rzp_test_oRfSzsSGPgUAwU",
                        "amount": response.total_price * 100,
                        "currency": "INR",
                        "name": "Harper",
                        "description": "Thank you for buying from us",
                        "image": "https://example.com/your_logo",
                        "order_id": "order_9A33XWu170gUtm",
                        "handler": function(responseb){
                            alert(responseb.razorpay_payment_id);
                            data = {
                                "fname": fname,
                                "lname": lname,
                                "email": email,
                                "phone": phone,
                                "address": address,
                                "city": city,
                                "state": state,
                                "country": country,
                                "fname": fname,
                                "pincode": pincode,
                                "payment_mode": Paid by Razorpay,
                                "payment_id": responseb.razorpay_payment_id,
                                csrfmiddlewaretoken: token

                            }
                            $.ajax({
                                method: "POST",
                                url: "/place-order",
                                data:data,
                                success: function(response){
                                    swal("Congratulations", response.status, "success").then((value)=> {
                                        window.location.href = '/my-orders'
                                    });
                                }
                            });
                        },
                        "prefill": {
                            "name": fname+" "+lname,
                            "email": email,
                            "contact": phone
                        },
                        "theme": {
                            "color": "#3399cc"
                        }
                    };
                    var rzpl = new Razorpay(options);
                    rzpl.open();
                }
            });

        }
    })
})