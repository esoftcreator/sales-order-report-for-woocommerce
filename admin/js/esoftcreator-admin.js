(function( $ ) {
	/**
	 * This enables you to define handlers, for when the DOM is ready:
	 * $(function() {  });
	 * When the window is loaded:
	 * $( window ).load(function() { });
	 */


})( jQuery );
var  chart_ids = {};
/**
 * start js helper
 */
var esoftc_helper = {
 	esoftc_alert:function(msg_type=null, msg_subject=null, msg, auto_close=false, esoftc_time=7000){
		document.getElementById('esoftc_msg_title').innerHTML ="";
		document.getElementById('esoftc_msg_content').innerHTML ="";
		document.getElementById('esoftc_msg_icon').innerHTML ="";

		if(msg != ""){
			let esoftc_popup_box = document.getElementById('esoftc_popup_box');
			esoftc_popup_box.classList.remove("esoftc_popup_box_close");
			esoftc_popup_box.classList.add("esoftc_popup_box");

	  	//esoftc_popup_box.style.display = "block";
	  	document.getElementById('esoftc_msg_title').innerHTML =this.esoftc_subject_title(msg_type, msg_subject);
			document.getElementById('esoftc_msg_content').innerHTML =msg;
			if(msg_type=="success"){
				document.getElementById('esoftc_msg_icon').innerHTML ='<i class="fas fa-check-circle fa-3x tvc-success"></i>';
			}else{
				document.getElementById('esoftc_msg_icon').innerHTML ='<i class="fas fa-exclamation-circle fa-3x"></i>';
			}
			if(auto_close == true){
				setTimeout(function(){  //esoftc_popup_box.style.display = "none";				
					esoftc_popup_box.classList.add("esoftc_popup_box_close");
					esoftc_popup_box.classList.remove("esoftc_popup_box");				
				}
				, esoftc_time);
			}
		}
	},
	esoftc_subject_title:function(msg_type=null, msg_subject=null){
		if(msg_subject == null || msg_subject ==""){
			if(msg_type=="success" ){
				return '<span class="tvc-success">Success!!</span>';
			}else{
				return '<span class="tvc-error">Oops!</span>';
			}
		}else{
			if(msg_type=="success" ){
				return '<span class="tvc-success">'+msg_subject+'</span>';
			}else{
				return '<span>'+msg_subject+'</span>';
			}
		}		
	},
	esoftc_close_msg:function(){
		let esoftc_popup_box = document.getElementById('esoftc_popup_box');
		esoftc_popup_box.classList.add("esoftc_popup_box_close");
		esoftc_popup_box.classList.remove("esoftc_popup_box");
		//esoftc_popup_box.style.display = "none";
	},
	get_sales_report_analysis:function(post_data){
		//console.log(post_data);
		this.cleare_sales_reports('sales_analysis');
		this.add_loader_for_sales_reports('sales_analysis');
		this.sales_reports_call_data(post_data,'sales_analysis');
	},
	get_sales_reports:function(post_data){
		//console.log(post_data);
		this.cleare_sales_reports('sales_report');
		this.add_loader_for_sales_reports('sales_report');
		this.sales_reports_call_data(post_data,'sales_report');
	},
	sales_reports_call_data:function(post_data, page){
		var v_this = this;
		$.ajax({
      type: "POST",
      dataType: "json",
      url: esoftc_ajax_url,
      data: post_data,
      success: function (response) {
      	console.log(response);
      	if(response.error == false){
      		if(Object.keys(response.data).length > 0 && page == 'sales_report'){
      			v_this.set_sales_reports_value(response.data, post_data);
      		}else if(Object.keys(response.data).length > 0 && page == 'sales_analysis'){
      			v_this.set_sales_analytics_value(response.data, post_data);
      		}
      	}else if(response.error == true && response.errors != undefined){
	        const errors = response.errors[0];
	        //v_this.esoftc_alert("error","Error",errors);
	      }else{
	      		//v_this.esoftc_alert("error","Error","Sales report data not fetched");
	      }
        v_this.remove_loader_for_analytics_reports(page);
      }
    });
	},
	set_sales_analytics_value:function(data, post_data){
		var v_this = this;		
		var basic_data = data.summury;
		//console.log(basic_data);
		var currency_code = data.currency;
		var plugin_url = post_data.plugin_url;
		var s_1_div_id ={
			'total_sale':{
				'id':'total_sale',
				'type':'currency',
				'is_chart':true,
				'chart_id':'total_sale_chart'
			},'net_sale':{
				'id':'net_sale',
				'type':'currency',
			},'total_orders':{
				'id':'total_orders',
				'type':'number',
				'is_chart':true,
				'chart_type':'bar',
				'chart_title':'Orders',
				'chart_id':'total_orders_chart'
			},'average_order_value':{
				'id':'average_order_value',
				'type':'currency',
				'is_chart':true,
				'chart_type':'line',
				'chart_title':'Average order value',
				'chart_id':'average_order_value_chart'
			},'refund_order':{
				'id':'refund_order',
				'type':'number',
				'is_chart':true,
				'chart_type':'bar',
				'chart_title':'Refund orders',
				'chart_id':'refund_order_chart'
			},'refund_order_value':{
				'id':'refund_order_value',
				'type':'currency',
				'is_chart':true,
				'chart_type':'line',
				'chart_title':'Refund',
				'chart_id':'refund_order_value_chart'
			},'discount_amount':{
				'id':'discount_amount',
				'type':'currency',
				'is_chart':true,
				'chart_type':'bar',
				'chart_title':'Discount',
				'chart_id':'discount_amount_chart'
			},'total_tax':{
				'id':'total_tax',
				'type':'currency',
				'is_chart':true,
				'chart_type':'line',
				'chart_title':'Total TAX',
				'chart_id':'total_tax_chart'
			},'order_tax':{
				'id':'order_tax',
				'type':'currency',
				'is_chart':true,
				'chart_type':'bar',
				'chart_title':'Order TAX',
				'chart_id':'order_tax_chart'
			},'shipping_tax':{
				'id':'shipping_tax',
				'type':'currency',
				'is_chart':true,
				'chart_type':'bar',
				'chart_title':'Shipping TAX',
				'chart_id':'shipping_tax_chart'
			},'shipping':{
				'id':'shipping',
				'type':'currency',
				'is_chart':true,
				'chart_type':'line',
				'chart_title':'shipping',
				'chart_id':'shipping_chart'
			},'wc_on_hold':{
				'id':'wc_on_hold',
				'type':'number'
			},'wc_processing':{
				'id':'wc_processing',
				'type':'number'
			},'wc_cancelled':{
				'id':'wc_cancelled',
				'type':'number'
			},'wc_completed':{
				'id':'wc_completed',
				'type':'number'
			},'order_status':{
				'id':'total_orders',
				'type':'number',
				'is_chart':true,
				'chart_type':'pie',
				'chart_title':'Order status',
				'chart_id':'order_status_chart'
			}
		};
		var reports_typs = {
			basec_data:{
				is_free:true
			},product_performance_report:{
				is_free:false
			},medium_performance_report:{
				is_free:false
			},conversion_funnel:{
				is_free:false
			},checkout_funnel:{
				is_free:false
			}
		};
		var paln_type = 'free';
		if(post_data.plan_id != 1){
			paln_type='paid';
		}
		if(Object.keys(s_1_div_id).length > 0){
			var temp_val =""; var temp_div_id = "";
			$.each(s_1_div_id, function (propKey, propValue) {	
				/**
					* set fields value
					*/			
				if(basic_data.hasOwnProperty(propValue['id'])){
					temp_val = basic_data[propValue['id']];
					temp_div_id = "#s1_"+propValue['id']+" > .sales-smry-value";
					v_this.display_field_val(temp_div_id, propValue, temp_val, propValue['type'], currency_code);
				}else{
					temp_div_id = "#s1_"+propValue['id']+" > .sales-smry-value";
					v_this.display_field_val(temp_div_id, propValue, 0, propValue['type'], currency_code);
				}
				if(basic_data.hasOwnProperty('compare_'+propValue['id'])){
					temp_val = basic_data['compare_'+propValue['id']];
					temp_div_id = "#s1_"+propValue['id']+" > .sales-smry-compare-val";
					v_this.display_field_val(temp_div_id, propValue, temp_val, 'rate', currency_code, plugin_url);

					//$("#s1_"+propValue['id']+" > .dash-smry-value").html(temp_val);
				}	
				/**
					* drow_chart
					*/
				if(propValue['chart_id']!= undefined && propValue['is_chart'] != undefined && propValue['chart_type'] != undefined){
					var chart_id = propValue['chart_id'];
					var field_id = propValue['id'];
					var chart_title = propValue['chart_title'];
					//console.log(propValue['chart_type']+"call"+chart_id);
					if(propValue['chart_type'] == 'bar'){
						v_this.add_genrale_bare_chart(chart_id, data, field_id, chart_title);
					}else if(propValue['chart_type'] == 'line'){
						v_this.add_genrale_line_chart(chart_id, data, field_id, chart_title);
					}else if(propValue['chart_type'] == 'pie'){
						if(chart_id == 'order_status_chart'){
							temp_val = basic_data['total_orders'];
							temp_div_id = "#s1_order_status > .sales-smry-value";
							v_this.display_field_val(temp_div_id, propValue, temp_val, propValue['type'], currency_code);
							v_this.add_genrale_pie_chart(chart_id, basic_data.order_status, 'total_orders',  chart_title, true);			
						}
					}
				}else	if(propValue['is_chart'] != undefined && propValue['chart_id'] == "total_sale_chart"){
					
					v_this.drow_chart(propValue['chart_id'], 'line_interpolation', data);
				}			
			});
		}
		/**
			* Display table
			*/
		if(data.hasOwnProperty('product_performance_report') && ( reports_typs.product_performance_report.is_free || paln_type == 'paid')){
			var p_p_r = data.product_performance_report.products;
			var table_row = '';
			if(p_p_r != undefined && Object.keys(p_p_r).length > 0){
				$.each(p_p_r, function (propKey, propValue) {
					table_row = '';
					table_row += '<tr><td class="prdnm-cell">'+propValue['productName']+'</td>';
					table_row += '<td>'+propValue['productDetailViews']+'</td>';
					table_row += '<td>'+propValue['productAddsToCart']+'</td>';
					table_row += '<td>'+propValue['uniquePurchases']+'</td>';
					table_row += '<td>'+propValue['itemQuantity']+'</td>';
					table_row += '<td>'+propValue['itemRevenue']+'<span class="tddshpertg">('+propValue['revenuePerItem']+')</span></td>';
					table_row += '<td>'+propValue['revenuePerItem']+'</td>';
					table_row += '<td>'+propValue['productRefundAmount']+'</td>';
					table_row += '<td>'+propValue['cartToDetailRate']+'%</td>';
					table_row += '<td>'+propValue['buyToDetailRate']+'%</td></tr>';
					$("#product_performance_report table tbody").append(table_row);
				})
			}else{
				$("#product_performance_report table tbody").append("<tr><td>Data not available</td></tr>");
			}
		}
	},
	set_sales_reports_value:function(data, post_data){
		var v_this = this;		
		var basic_data = data.summury;
		//console.log(basic_data);
		var currency_code = data.currency;
		var plugin_url = post_data.plugin_url;
		var s_1_div_id ={
			'total_sale':{
				'id':'total_sale',
				'type':'currency'
			},'net_sale':{
				'id':'net_sale',
				'type':'currency'
			},'total_orders':{
				'id':'total_orders',
				'type':'number'
			},'average_order_value':{
				'id':'average_order_value',
				'type':'currency'
			},'refund_order':{
				'id':'refund_order',
				'type':'number'
			},'refund_order_value':{
				'id':'refund_order_value',
				'type':'currency'
			},'discount_amount':{
				'id':'discount_amount',
				'type':'currency'
			},'total_tax':{
				'id':'total_tax',
				'type':'currency'
			},'order_tax':{
				'id':'order_tax',
				'type':'currency'
			},'shipping_tax':{
				'id':'shipping_tax',
				'type':'currency'
			},'shipping':{
				'id':'shipping',
				'type':'currency'
			},'wc_on_hold':{
				'id':'wc_on_hold',
				'type':'number'
			},'wc_processing':{
				'id':'wc_processing',
				'type':'number'
			},'wc_cancelled':{
				'id':'wc_cancelled',
				'type':'number'
			},'wc_completed':{
				'id':'wc_completed',
				'type':'number'
			}
		};
		var reports_typs = {
			basec_data:{
				is_free:true
			},product_performance_report:{
				is_free:false
			},medium_performance_report:{
				is_free:false
			},conversion_funnel:{
				is_free:false
			},checkout_funnel:{
				is_free:false
			}
		};
		var paln_type = 'free';
		if(post_data.plan_id != 1){
			paln_type='paid';
		}
		if(Object.keys(s_1_div_id).length > 0){
			var temp_val =""; var temp_div_id = "";
			$.each(s_1_div_id, function (propKey, propValue) {				
				if(basic_data.hasOwnProperty(propValue['id'])){
					temp_val = basic_data[propValue['id']];
					temp_div_id = "#s1_"+propValue['id']+" > .sales-smry-value";
					v_this.display_field_val(temp_div_id, propValue, temp_val, propValue['type'], currency_code);
				}else{
					temp_div_id = "#s1_"+propValue['id']+" > .sales-smry-value";
					v_this.display_field_val(temp_div_id, propValue, 0, propValue['type'], currency_code);
				}
				if(basic_data.hasOwnProperty('compare_'+propValue['id'])){
					temp_val = basic_data['compare_'+propValue['id']];
					temp_div_id = "#s1_"+propValue['id']+" > .sales-smry-compare-val";
					v_this.display_field_val(temp_div_id, propValue, temp_val, 'rate', currency_code, plugin_url);

					//$("#s1_"+propValue['id']+" > .dash-smry-value").html(temp_val);
				}				
			});
		}

		if(data.hasOwnProperty('product_performance_report') && ( reports_typs.product_performance_report.is_free || paln_type == 'paid')){
			var p_p_r = data.product_performance_report.products;
			//console.log(p_p_r);
			var table_row = '';
			if(p_p_r != undefined && Object.keys(p_p_r).length > 0){
				$.each(p_p_r, function (propKey, propValue) {
					table_row = '';
					table_row += '<tr><td class="prdnm-cell">'+propValue['productName']+'</td>';
					table_row += '<td>'+propValue['productDetailViews']+'</td>';
					table_row += '<td>'+propValue['productAddsToCart']+'</td>';
					table_row += '<td>'+propValue['uniquePurchases']+'</td>';
					table_row += '<td>'+propValue['itemQuantity']+'</td>';
					table_row += '<td>'+propValue['itemRevenue']+'<span class="tddshpertg">('+propValue['revenuePerItem']+')</span></td>';
					table_row += '<td>'+propValue['revenuePerItem']+'</td>';
					table_row += '<td>'+propValue['productRefundAmount']+'</td>';
					table_row += '<td>'+propValue['cartToDetailRate']+'%</td>';
					table_row += '<td>'+propValue['buyToDetailRate']+'%</td></tr>';
					$("#product_performance_report table tbody").append(table_row);
				})
			}else{
				$("#product_performance_report table tbody").append("<tr><td>Data not available</td></tr>");
			}
		}
	},
	display_field_val:function(div_id, field, field_val, field_type, currency_code, plugin_url){
		console.log(field_val+"-"+div_id);
		if(field_type == "currency"){
			var currency = this.get_currency_symbols(currency_code);
			$(div_id).html(currency +''+field_val);
		}else if(field_type == "rate"){
			field_val = parseFloat(field_val).toFixed(2);
			var img = "";
			if(plugin_url != "" && plugin_url != undefined){
				img = '<img src="'+plugin_url+'/admin/images/red-down.png">';
				if(field_val >0){
					img = '<img src="'+plugin_url+'/admin/images/green-up.png">';
				}
			}
			$(div_id).html(img+field_val+'%');
		}else {
			$(div_id).html(field_val);
		}

	},
	drow_chart:function(chart_id, chart_type, alldata){
		var chart_data = alldata.date;
		/**
			* total_sale_chart
			*/
		if(chart_id == "total_sale_chart"){
			var ctx = document.getElementById(chart_id).getContext('2d');
			const DATA_COUNT = 12;
			const labels = [];
			const net_sales = [];
			const total_sale = []; 
			var t_date = "";
			$.each(chart_data, function (key, value) {
				t_date = value['order_date'];
			  labels.push(t_date.toString());
			  net_sales.push(((value['line_subtotal']!=null)?value['line_subtotal']:0));
			  total_sale.push(((value['order_total']!=null)?value['order_total']:0));
			});
			//const datapoints = [0, 20, 20, 60, 60, 120, 45, 180, 120, 125, 105, 110, 170];
			const data = {
			  labels: labels,
			  datasets: [
			    {
			      label: 'Total sales',
			      data: total_sale,
			      borderColor: '#878743',
			      fill: false,
			      cubicInterpolationMode: 'monotone',
			      tension: 0.4
			    }, {
			      label: 'Net Sales',
			      data: net_sales,
			      borderColor: '#8BBFEC',
			      fill: false,
			      tension: 0.4
			    }
			  ]
			};
			const config = {
			  type: 'line',
			  data: data,
			  options: {
			    responsive: true,
			    plugins: {
			      title: {
			        display: true,
			        text: 'Total sales - Net Sales'
			      },
			    },
			    interaction: {
			      intersect: false,
			    },
			    scales: {
			      x: {
			        display: true,
			        title: {
			          display: true
			        }
			      },
			      y: {
			        display: true,
			        title: {
			          display: true,
			          text: 'Value'
			        },
			        suggestedMin: 0,
			        suggestedMax: 200
			      }
			    }
			  },
			};
			chart_ids[chart_id] = new Chart(ctx,config);
			//total_sale_chart
		}

	},
	add_genrale_pie_chart:function(chart_id, alldata, field_key,  d_label, is_labels_as_key =false){
		var chart_data = alldata;
		var ctx = document.getElementById(chart_id).getContext('2d');
			
		const labels = [];
		const chart_val = [];
		var t_labels = "";
		var d_backgroundColors = ['#FF6384','#22CFCF','#0ea50b','#FF9F40','#FFCD56']
		$.each(chart_data, function (key, value) {
			if(is_labels_as_key){
				t_labels =key;
			}else{
				t_labels = value['order_date'];
			}				
		  labels.push(t_labels.toString());
		  //chart_val.push(value[field_key]);
		  chart_val.push(((value[field_key]!=null)?value[field_key]:0));
		});
		console.log(alldata);
		console.log(field_key);
		console.log(chart_val);
		const data = {
			  labels: labels,
			  datasets: [
			    {
			      label: d_label,
			      data: chart_val,
			      backgroundColor: d_backgroundColors,
			    }
			  ]
			};
			const config = {
			  type: 'pie',
			  data: data,
			  options: {
			    responsive: true,
			    plugins: {
			      legend: {
			        position: 'top',
			      },
			      title: {
			        display: true,
			        text: d_label
			      }
			    }
			  },
			};
			chart_ids[chart_id] = new Chart(ctx,config);
	},
	add_genrale_bare_chart:function(chart_id, alldata, field_key, d_label, d_borderColor ='#9AD0F5', d_backgroundColor ='#9AD0F5'){
		var chart_data = alldata.date;
		var ctx = document.getElementById(chart_id).getContext('2d');
			const DATA_COUNT = 7;
			
			const labels = [];
			const chart_val = [];
			var t_date = "";
			$.each(chart_data, function (key, value) {
				t_date = value['order_date'];
			  labels.push(t_date.toString());
			  //chart_val.push(value[field_key]);
			  chart_val.push(((value[field_key]!=null)?value[field_key]:0));
			});
		const data = {
			  labels: labels,
			  datasets: [
			    {
			      label: d_label,
			      data: chart_val,
			      borderColor: d_borderColor,
			      backgroundColor: d_backgroundColor,
			    }
			  ]
			};
			const config = {
			  type: 'bar',
			  data: data,
			  options: {
			    responsive: true,
			    plugins: {
			      legend: {
			        position: 'top',
			      },
			      title: {
			        display: true,
			        text: d_label
			      }
			    }
			  },
			};
			chart_ids[chart_id] = new Chart(ctx,config);
	},
	add_genrale_line_chart:function(chart_id, alldata, field_key, d_label, d_borderColor ='#9AD0F5', d_backgroundColor ='#9AD0F5'){
		var chart_data = alldata.date;
		var ctx = document.getElementById(chart_id).getContext('2d');
			const DATA_COUNT = 7;
			
			const labels = [];
			const chart_val = [];
			var t_date = "";
			$.each(chart_data, function (key, value) {
				t_date = value['order_date'];
			  labels.push(t_date.toString());
			  chart_val.push(((value[field_key]!=null)?value[field_key]:0));
			});
		const data = {
			  labels: labels,
			  datasets: [
			    {
			      label: d_label,
			      data: chart_val,
			      borderColor: d_borderColor,
			      backgroundColor: d_backgroundColor,
			    }
			  ]
			};
			const config = {
			  type: 'line',
			  data: data,
			  options: {
			    responsive: true,
			    plugins: {
			      legend: {
			        position: 'top',
			      },
			      title: {
			        display: true,
			        text: d_label
			      }
			    }
			  },
			};
			chart_ids[chart_id] = new Chart(ctx,config);
	},
	remove_loader_for_analytics_reports:function(page){
		var reg_section = this.get_sales_reports_section(page);
		if(Object.keys(reg_section).length > 0){
			$.each(reg_section, function (propKey, propValue) {
				if(propValue.hasOwnProperty('main-class') && propValue.hasOwnProperty('loading-type')){
					if(propValue['loading-type'] == 'bgcolor'){
						//$("."+propValue['main-class']).addClass("is_loading");
						if(Object.keys(propValue['ajax_fields']).length > 0){
							$.each(propValue['ajax_fields'], function (propKey, propValue) {
									$("."+propValue['class']).removeClass("loading-bg-effect");
							});
						}
					}else if(propValue['loading-type'] == 'gif'){
						$("."+propValue['main-class']).removeClass("is_loading");
					}

				}
			});
			
		}
	},
	cleare_sales_reports:function(page){
		var v_this = this;
		
		
		if(page=='sales_report'){
			//$("#product_performance_report table tbody").html("");
		}else if(page == 'sales_analysis'){
			if(Object.keys(chart_ids).length > 0){
				$.each(chart_ids, function (propKey, propValue) {
					var canvas = document.getElementById(propKey);
					if( canvas != null){
						var is_blank = v_this.is_canvas_blank(canvas);
						console.log(propValue+"-"+canvas+"-"+is_blank);
				    if(!is_blank){
				    	chart_ids[propKey].destroy();		    	
				    }
				  }
				});			
			}
		}
		
		//$("#medium_performance_report table tbody").html("");
		
		
	  /*canvas = document.getElementById('ecomcheckoutfunchart');
	  if(canvas != null){
	    var is_blank = this.is_canvas_blank(canvas);
	    if(!is_blank){
	    	checkout_bar_chart.destroy();
	    	//const canvas = document.getElementById('ecomfunchart');
		  		//canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
	    }
	  }*/
	},
	add_loader_for_sales_reports:function(page){
		var reg_section = this.get_sales_reports_section(page);
		if(Object.keys(reg_section).length > 0){
			$.each(reg_section, function (propKey, propValue) {
				if(propValue.hasOwnProperty('main-class') && propValue.hasOwnProperty('loading-type')){
					if(propValue['loading-type'] == 'bgcolor'){
						//$("."+propValue['main-class']).addClass("is_loading");
						if(Object.keys(propValue['ajax_fields']).length > 0){
							$.each(propValue['ajax_fields'], function (propKey, propValue) {
									$("."+propValue['class']).addClass("loading-bg-effect");
							});
						}
					}else if(propValue['loading-type'] == 'gif'){
						$("."+propValue['main-class']).addClass("is_loading");
					}

				}
			});			
		}
	},
	get_sales_reports_section:function(page){
		if(page=='sales_report'){
			return {
				'dashboard_summary':{
					'loading-type':'bgcolor',
					'main-class':'esoftc-sales-rep-sec-1',
					'sub-clsass':'product-card',
					'ajax_fields':{
						'field_1':{
							'class':'sales-smry-title'
						},'field_2':{
							'class':'sales-smry-value'
						}
					}
				},'product_performance_report':{
					'loading-type':'gif',
					'main-class':'product_performance_report',
				}
			};
		}else if(page == 'sales_analysis'){
			return {
				'dashboard_summary':{
					'loading-type':'bgcolor',
					'main-class':'esoftc-sales-rep-sec-1',
					'sub-clsass':'product-card',
					'ajax_fields':{
						'field_1':{
							'class':'sales-smry-title'
						},'field_2':{
							'class':'sales-smry-value'
						}
					}
				},'total_sale_chart':{
					'loading-type':'gif',
					'main-class':'total-sale-chart',
				},'total_orders_chart':{
					'loading-type':'gif',
					'main-class':'total-orders-chart',
				},'average_order_value_chart':{
					'loading-type':'gif',
					'main-class':'average-order-value-chart',
				},'refund_order_chart':{
					'loading-type':'gif',
					'main-class':'refund-order-chart',
				},'refund_order_value_chart':{
					'loading-type':'gif',
					'main-class':'refund-order-value-chart',
				},'discount_amount_chart':{
					'loading-type':'gif',
					'main-class':'discount-amount-chart',
				},'total_tax_chart':{
					'loading-type':'gif',
					'main-class':'total-tax-chart',
				},'order_tax_chart':{
					'loading-type':'gif',
					'main-class':'order-tax-chart',
				},'shipping_tax_chart':{
					'loading-type':'gif',
					'main-class':'shipping-tax-chart',
				},'shipping_chart':{
					'loading-type':'gif',
					'main-class':'shipping-chart',
				}
			};
		}
		
	},get_currency_symbols:function(code){
		var currency_symbols = {
		    'USD': '$', // US Dollar
		    'EUR': '€', // Euro
		    'CRC': '₡', // Costa Rican Colón
		    'GBP': '£', // British Pound Sterling
		    'ILS': '₪', // Israeli New Sheqel
		    'INR': '₹', // Indian Rupee
		    'JPY': '¥', // Japanese Yen
		    'KRW': '₩', // South Korean Won
		    'NGN': '₦', // Nigerian Naira
		    'PHP': '₱', // Philippine Peso
		    'PLN': 'zł', // Polish Zloty
		    'PYG': '₲', // Paraguayan Guarani
		    'THB': '฿', // Thai Baht
		    'UAH': '₴', // Ukrainian Hryvnia
		    'VND': '₫', // Vietnamese Dong
		};
		if(currency_symbols[code]!==undefined) {
		  return currency_symbols[code];
		}else{
			return code;
		}
	},is_canvas_blank:function (canvas) {
  	const context = canvas.getContext('2d');
	  const pixelBuffer = new Uint32Array(
	    context.getImageData(0, 0, canvas.width, canvas.height).data.buffer
	  );
  	return !pixelBuffer.some(color => color !== 0);
	}
};//end esoftc_helper