var status = 'on';
if (document.designMode === 'on') {
	status = 'off';
}
document.designMode = status;