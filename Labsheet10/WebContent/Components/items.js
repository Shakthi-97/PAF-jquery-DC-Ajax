$(document).ready(function(){
 
		if ($("#alertSuccess").text().trim() == ""){ 
				$("#alertSuccess").hide(); 
		} 
		$("#alertError").hide(); 
				
}); 


//SAVE ============================================
$(document).on("click", "#btnSave", function(event){ 
 
		// Clear alerts---------------------
		$("#alertSuccess").text(""); 
		$("#alertSuccess").hide(); 
		$("#alertError").text(""); 
		$("#alertError").hide(); 
		
		//Form validation-------------------
		var status = validateItemForm(); 
		if (status != true) {
   
			$("#alertError").text(status); 
			$("#alertError").show(); 
			return; 
  } 
		
		// If valid identify the method-------------------------
		var type = ($("#hidItemIDSave").val() == "") ? "POST" : "PUT";
		
		//sending data to the DC Bus
		$.ajax({ 
  
			url : "ItemsAPI", 
			type : type, 
			data : $("#formItem").serialize(), 
			dataType : "text", 
			complete : function(response, status) { 
					onItemSaveComplete(response.responseText, status); 
			  } 
		
		}); 
 
 });




function onItemSaveComplete(response, status){
 
		if (status == "success") { 
 
			var resultSet = JSON.parse(response); 
			if (resultSet.status.trim() == "success") { 
 
				$("#alertSuccess").text("Items are successfully saved."); 
				$("#alertSuccess").show(); 
				$("#divItemsGrid").html(resultSet.data); 
				
			} else if (resultSet.status.trim() == "error") {  

				$("#alertError").text(resultSet.data); 
				$("#alertError").show(); 
			} 
			
			} else if (status == "error")  {
 
				$("#alertError").text("Error while saving the items."); 
				$("#alertError").show(); 
			} else {
 
				$("#alertError").text("Unknown error while saving.."); 
				$("#alertError").show(); 
			} 
		
			$("#hidItemIDSave").val(""); 
			$("#formItem")[0].reset(); 
}




//UPDATE==========================================
$(document).on("click", ".btnUpdate", function(event){  

$("#hidItemIDSave").val($(this).closest("tr").find('#hidItemIDUpdate').val()); 
$("#ItemCode").val($(this).closest("tr").find('td:eq(0)').text()); 
$("#ItemName").val($(this).closest("tr").find('td:eq(1)').text()); 
$("#ItemPrice").val($(this).closest("tr").find('td:eq(2)').text()); 
$("#ItemDesc").val($(this).closest("tr").find('td:eq(3)').text()); 
});




//DELETE implementation
$(document).on("click", ".btnRemove", function(event) {
	
	$.ajax({
		url : "ItemsAPI",
		type : "DELETE",
		data : "itemID=" + $(this).data("itemid"),
		dataType : "text",
		complete : function(response, status) {
			onItemDeleteComplete(response.responseText, status);
		}
	});
	
});





function onItemDeleteComplete(response, status) {
 
		if (status == "success") {
 
			var resultSet = JSON.parse(response); 
			if (resultSet.status.trim() == "success"){ 
  
				$("#alertSuccess").text("Successfully deleted."); 
				$("#alertSuccess").show(); 
				$("#divItemsGrid").html(resultSet.data);
				
			} else if (resultSet.status.trim() == "error") {
  
				$("#alertError").text(resultSet.data); 
				$("#alertError").show(); 
			} 
			
			} else if (status == "error") {
  
				$("#alertError").text("Error while deleting."); 
				$("#alertError").show(); 
			} else {
  
				$("#alertError").text("Unknown error while deleting.."); 
				$("#alertError").show(); 
			} 
}




//CLIENT-MODEL================================================================
function validateItemForm() { 

	//CODE
	if ($("#ItemCode").val().trim() == "") {
 
		return "Insert Item Code."; 
	} 
	
	//NAME
	if ($("#ItemName").val().trim() == "") {
 
		return "Insert Item Name."; 
	} 

	//PRICE-------------------------------
	if ($("#ItemPrice").val().trim() == "") {
 
		return "Insert Item Price."; 
	} 
	
	//is numerical value
	var tmpPrice = $("#ItemPrice").val().trim(); 
	if (!$.isNumeric(tmpPrice)) {
 
		return "Insert a numerical value for Item Price."; 
	} 
	
	//convert to decimal price
	$("#ItemPrice").val(parseFloat(tmpPrice).toFixed(2)); 
	
	//DESCRIPTION------------------------
	if ($("#ItemDesc").val().trim() == ""){ 
 
		return "Insert Item Description."; 
	} 
	
	return true; 
}




