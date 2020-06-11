var MyApplication = {
	handleClick: function(event) {
        this.showCoordinate(event.clientX, event.clientY);
        console.log("click: " + event.type)
    },
    handleMouseenter: function(event) {
        this.showCoordinate(event.clientX, event.clientY);
        console.log("mouseenter: " + event.type)
    },
	showCoordinate: function(x, y) {
        var b = document.getElementById("b");
        b.innerHTML = x + "px, " + y + "px";
		b.value = x + "px, " + y + "px";
	}
};

document.getElementById("a").addEventListener("click", function(event) {
	MyApplication.handleClick(event);
});
document.getElementById("a").addEventListener("mouseenter", function(event) {
	MyApplication.handleMouseenter(event);
});