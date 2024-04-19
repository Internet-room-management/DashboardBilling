<script setup lang="ts">
import { ref } from "vue";
import { projectTableData } from "@/_mockApis/components/dashboards/AnalyticalData";
// import { socket, state  } from "@/socketIO";
const select = ref("March");
const items = ref(["March", "April", "May", "June"]);
// console.log('socketIO', state.connecte)

import { io } from "socket.io-client";
const socket = io(`http://localhost:18092`,{
					
					transports: ["websocket"],
				});

socket.on('welcome', () => {
  console.log('on welcome : welcome received renderer'); // displayed
//   socket.emit('test')
});
socket.on('error', (e) => {
  console.log('error', e); // not displayed
});
socket.on('ok', () => {
  console.log("OK received renderer"); // not displayed
});
socket.on('connect', () => {
  console.log("connected renderer xx"); // displayed
//   socket.emit('test');

  socket.emit("register", {
						userid: 'userInfos.userid',
						shopid: 'userInfos.shopid',
						roleid: 'userInfos.roleid',
						view: 'cashier'
					});
});
// Lắng nghe sự kiện kết nối lại thành công
socket.on('reconnect', (attemptNumber) => {
    console.log('Reconnected on attempt:', attemptNumber);
});
socket.on('connect_error', (err) => {
    console.log('Connect error:', err.message);
});
socket.on('disconnect', () => {
    console.log('Disconnected from server');
});
socket.on('notify_bar', (data) => {
  console.log("OK notify_bar", data); // not displayed
});

console.log('projectTableData', projectTableData)

var socketUrl = window.location.protocol + "//" + window.location.host;
// var socket = io(socketUrl, {
// 					origins: "*",
// 					transports: ["websocket"],
// 				});
console.log('socket', socket, socketUrl)
// socket.on("connected", function () {
// 					console.log("socket conectedddddddddddd")
// 					socket.emit("register", {
// 						userid: userInfos.userid,
// 						shopid: userInfos.shopid,
// 						roleid: userInfos.roleid,
// 						view: 'cashier'
// 					});

// 					socket.emit("customEvent", {
// 						name: "shopinfo",
// 						shopInfo: shopInfo,
// 						shopname: shopInfo.name_vn,
// 						shopphone: shopInfo.phones,
// 						shopaddress: shopInfo.addr,
// 						username: userInfos.username,
// 						partnerid: shopInfo.partnerid,
// 						shopid: shopInfo.id,
// 						svfee: shopInfo.svfee,
// 					});

// 					socket.emit("customEvent", {
// 						name: "changeproduct",
// 						data: $scope.list_product,
// 						typeOrder: $scope.table,
// 					});
// });
// socket.on("disconnect", (data) => {
//     if (data == "io server disconnect") disconnect();
// });

// socket.emit('notify_bar', { shopid: shopInfo.id })

// socket.emit("customEvent", {
// 							name: "changeproduct",
// 							data: $scope.list_product,
// 							typeOrder: $scope.table,
// 						});


</script>
<template>
    <VCard elevation="10">
        <v-card-text>
            <div class="d-sm-flex align-center">
                <div>
                    <h2 class="text-h4">PC Manager</h2>
                </div>
                <v-spacer></v-spacer>
                <div class="ml-auto">
                    <v-select v-model="select" :items="items" variant="outlined" dense hide-details></v-select>
                </div>
            </div>
            <v-table class="month-table mt-5 mb-0">
                <template v-slot:default>
                    <thead>
                        <tr>
                            <th class="text-subtitle-1 font-weight-medium">UserName</th>
                            <th class="text-subtitle-1 font-weight-medium">PC</th>
                            <th class="text-subtitle-1 font-weight-medium">Status</th>
                            <th class="text-subtitle-1 font-weight-medium">Time Onlines</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="item in projectTableData" :key="item.leadname" :class="item.activestate"
                            class="month-item">
                            <td>
                                <div class="d-flex align-center">
                                    <v-avatar size="40">
                                        <img :src="item.img" alt="user" width="45" />
                                    </v-avatar>
                                    <div class="mx-4">
                                        <h4 class="text-h6 text-no-wrap">
                                            {{ item.leadname }}
                                        </h4>
                                        <h6 class="text-subtitle-1 text-medium-emphasis text-no-wrap font-weight-medium mt-1">
                                            {{ item.leademail }}
                                        </h6>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <h5 class="text-subtitle-1 text-medium-emphasis text-no-wrap font-weight-medium ">
                                    {{ item.projectname }}
                                </h5>
                            </td>
                            <td>
                                <v-chip class="ma-2" :color="item.statuscolor" size="small" label>{{ item.statustext
                                }}</v-chip>
                            </td>
                            <td>
                                <h4 class="text-body-1 font-weight-semibold">{{ item.money }}</h4>
                            </td>
                        </tr>
                    </tbody>
                </template>
            </v-table>
        </v-card-text>
    </VCard>
</template>