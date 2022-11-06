var display = document.getElementById("display")
var vm = new VM(document.getElementById("vm"))

if (localStorage.getItem("disk")) vm.device.disk = JSON.parse(JSON.stringify(JSON.parse(localStorage.getItem("disk"))))
window.addEventListener('beforeunload', function (e) {
    e.preventDefault();
    localStorage.setItem("disk", JSON.stringify(vm.device.disk))
});
