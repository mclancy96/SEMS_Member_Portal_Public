$(document).ready(function() {
	$('#everyMemberTable').DataTable({
		"lengthMenu": [ [-1, 10, 25, 50], ["All", 10, 25, 50] ],
		"order": [[ 2, "asc" ], [4, "desc"]]
	});
	$('#contactList').DataTable({
		"lengthMenu": [ [-1, 10, 25, 50], ["All", 10, 25, 50] ]
	});
	$('#rosterTable').DataTable({
		"order": [[ 2, "asc" ]],
		"lengthMenu": [ [-1, 10, 25, 50], ["All", 10, 25, 50] ]
	}); 
	$('.schedule').DataTable({
		"order": [[ 2, "asc" ]],
		"lengthMenu": [ [-1, 10, 25, 50], ["All", 10, 25, 50] ]
	}); 
	$('.scheduleDC').DataTable({
		"order": [[ 1, "asc" ]],
		"lengthMenu": [ [-1, 10, 25, 50], ["All", 10, 25, 50] ]
	});	
	$('.big-table.dataT').DataTable({
		"lengthMenu": [ [-1, 10, 25, 50], ["All", 10, 25, 50] ]
	});
 
	$('#graveyardTable').DataTable({
		"lengthMenu": [ [-1, 10, 25, 50], ["All", 10, 25, 50] ],
		"order": [[ 2, "desc" ], [4, "desc"]]
	}); 
	
});
