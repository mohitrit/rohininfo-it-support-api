const { serviceFile } = require("./email");
const cron = require("node-cron");
const EventEmitter = require("node:events");
// const ee1 = new EventEmitter({ captureRejections: true });

exports.service = () => {
	const service = new serviceFile();
	cron.schedule("1 9 * * *", () => {
		service.ReportPendingTask1day();
		service.ReportPendingTask5days();
		console.log("running a task every 5 am");
	});
	cron.schedule("1 8 * * *", () => {
		service.listDelayOrderInDispatch();
		console.log("running a task every 10 am");
	});
	// ee1.on("6:0:0", () => {
	// //   ee1.on("namit", () => {
	//   service.ReportPendingTask1day();
	//   service.ReportPendingTask5days();
	//   console.log("an event occurred!");
	// });
	// // ee1.emit('namit');
	// setInterval(() => {
	//   const date1 = new Date();
	// //   ee1.emit("namit");
	//   // console.log(date1.getHours()+":"+date1.getMinutes()+":"+date1.getSeconds())
	//   ee1.emit(date1.getHours()+":"+date1.getMinutes()+":"+date1.getSeconds());
	// },1000);
};
