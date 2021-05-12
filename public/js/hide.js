$(document).ready(function(req, res) {
	$('#eventStandbyDiv').attr('hidden', true);
	$('#dutyCrewDiv').attr('hidden', true);
	$('#tablingDiv').attr('hidden', true);
	$('#generalMeetingDiv').attr('hidden', true);
	$('#meetingDiv').attr('hidden', true);
	$('#trainingDiv').attr('hidden', true);
	$('#socialGatheringDiv').attr('hidden', true);
	$('#dlInfo').attr('hidden', true);
	$('#cprCertInfo').attr('hidden', true);
	$('#emtCertInfo').attr('hidden', true);
	if(res.locals.formType == "edit"){
		$("#startDate").val(function(){return shift.shiftStart.startDateRaw.toString.slice(0,4)+"-"+shift.shiftStart.startDateRaw.toString.slice(5,7)+"-"+shift.shiftStart.startDateRaw.toString.slice(8,10)})
		$("#endDate").val(function(){return shift.shiftEnd.endDateRaw.toString.slice(0,4)+"-"+shift.shiftEnd.endDateRaw.toString.slice(5,7)+"-"+shift.shiftEnd.endDateRaw.toString.slice(8,10)})
	}

});

//=========================================================================================Shift======================================================================

$("input[id='es']").change(function() {
	$('#eventStandbyDiv').attr('hidden', false);
	$('#dutyCrewDiv').attr('hidden', true);
	$('#tablingDiv').attr('hidden', true);
	$('#generalMeetingDiv').attr('hidden', true);
	$('#meetingDiv').attr('hidden', true);
	$('#trainingDiv').attr('hidden', true);
	$('#socialGatheringDiv').attr('hidden', true);
});

$("input[id='dc']").change(function() {
	$('#eventStandbyDiv').prop('hidden', true);
	$('#dutyCrewDiv').prop('hidden', false);
	$('#tablingDiv').prop('hidden', true);
	$('#generalMeetingDiv').prop('hidden', true);
	$('#meetingDiv').prop('hidden', true);
	$('#trainingDiv').prop('hidden', true);
	$('#socialGatheringDiv').prop('hidden', true);
});

$("input[id='ta']").change(function() {
	$('#eventStandbyDiv').attr('hidden', true);
	$('#dutyCrewDiv').attr('hidden', true);
	$('#tablingDiv').attr('hidden', false);
	$('#generalMeetingDiv').attr('hidden', true);
	$('#meetingDiv').attr('hidden', true);
	$('#trainingDiv').attr('hidden', true);
	$('#socialGatheringDiv').attr('hidden', true);
});

$("input[id='gm']").change(function() {
	$('#eventStandbyDiv').attr('hidden', true);
	$('#dutyCrewDiv').attr('hidden', true);
	$('#tablingDiv').attr('hidden', true);
	$('#generalMeetingDiv').attr('hidden', false);
	$('#meetingDiv').attr('hidden', true);
	$('#trainingDiv').attr('hidden', true);
	$('#socialGatheringDiv').attr('hidden', true);
});

$("input[id='m']").change(function() {
	$('#eventStandbyDiv').attr('hidden', true);
	$('#dutyCrewDiv').attr('hidden', true);
	$('#tablingDiv').attr('hidden', true);
	$('#generalMeetingDiv').attr('hidden', true);
	$('#meetingDiv').attr('hidden', false);
	$('#trainingDiv').attr('hidden', true);
	$('#socialGatheringDiv').attr('hidden', true);
});

$("input[id='tr']").change(function() {
	$('#eventStandbyDiv').attr('hidden', true);
	$('#dutyCrewDiv').attr('hidden', true);
	$('#tablingDiv').attr('hidden', true);
	$('#generalMeetingDiv').attr('hidden', true);
	$('#meetingDiv').attr('hidden', true);
	$('#trainingDiv').attr('hidden', false);
	$('#socialGatheringDiv').attr('hidden', true);
});

$("input[id='sg']").change(function() {
	$('#eventStandbyDiv').attr('hidden', true);
	$('#dutyCrewDiv').attr('hidden', true);
	$('#tablingDiv').attr('hidden', true);
	$('#generalMeetingDiv').attr('hidden', true);
	$('#meetingDiv').attr('hidden', true);
	$('#trainingDiv').attr('hidden', true);
	$('#socialGatheringDiv').attr('hidden', false);
});

//========================================================================================User===========================================================================

//Hide
$("input[id='cprRadios2']").change(function() {
	$('#cprCertInfo').attr('hidden', true);
  $("select[id='cprProvider']").prop('hidden', true);
  $("select[id='cprProvider']").prop('required',false);
  $("input[id='cprExpDate']").prop('hidden', true);
  $("input[id='cprExpDate']").prop('required',false);
});

$("input[id='emtRadios2']").change(function() {
	$('#emtCertInfo').attr('hidden', true);
  $("input[id='nremtID']").prop('hidden', true);
  $("input[id='nremtID']").prop('required',false);
  $("input[id='njEmtID']").prop('hidden', true);
  $("input[id='njEmtID']").prop('required',false);
  $("input[id='emtExpDate']").prop('hidden', true);
  $("input[id='emtExpDate']").prop('required',false);
});

$("input[id='dlRadios2']").change(function() {
	$('#dlInfo').attr('hidden', true);
  $("select[id='dlState']").prop('hidden', true);
  $("select[id='dlState']").prop('required',false);
  $("input[id='dlID']").prop('hidden', true);
  $("input[id='dlID']").prop('required',false);
  $("input[id='dlExpDate']").prop('hidden', true);
  $("input[id='dlExpDate']").prop('required',false);
});

// Show
$("input[id='cprRadios1']").change(function() {
	$('#cprCertInfo').attr('hidden', false);
  $("select[id='cprProvider']").prop('hidden', false);
  $("select[id='cprProvider']").prop('required', true);
  $("input[id='cprExpDate']").prop('hidden', false);
  $("input[id='cprExpDate']").prop('required', true);
});

$("input[id='emtRadios1']").change(function() {
	$('#emtCertInfo').attr('hidden', false);
  $("input[id='nremtID']").prop('hidden', false);
  $("input[id='nremtID']").prop('required', true);
  $("input[id='njEmtID']").prop('hidden', false);
  $("input[id='njEmtID']").prop('required', true);
  $("input[id='emtExpDate']").prop('hidden', false);
  $("input[id='emtExpDate']").prop('required', true);
});

$("input[id='dlRadios1']").change(function() {
	$('#dlInfo').attr('hidden', false);
  $("select[id='dlState']").prop('hidden', false);
  $("select[id='dlState']").prop('required', true);
  $("input[id='dlID']").prop('hidden', false);
  $("input[id='dlID']").prop('required', true);
  $("input[id='dlExpDate']").prop('hidden', false);
  $("input[id='dlExpDate']").prop('required', true);
});