<script setup lang="ts">
import { ref } from "vue";
// import { projectTableData } from "@/_mockApis/components/dashboards/AnalyticalData";
import img1 from '@/assets/images/profile/1.jpg';
const { ipcRenderer } = require('electron');
const select = ref("March");
const items = ref(["March", "April", "May", "June"]);
const projectTableData = ref([])

ipcRenderer.invoke('getAllPc')
        .then((todos: any) => {
            console.log('Open Manager', todos)
            projectTableData.value = todos
        })
        .catch((err: any) => console.error(err));

ipcRenderer.on('response-dataMain', (event: any, data: any) => {
    console.log('received', data)
    projectTableData.value = JSON.parse(data);
    // Xử lý dữ liệu nhận được
    console.log('Received data:', projectTableData.value);
});


</script>
<template>
    <VCard elevation="10">
        <v-card-text>
            <div class="d-sm-flex align-center">
                <div>
                    <h2 class="text-h4">PC Manager</h2>
                </div>
                <v-spacer></v-spacer>
                <!-- <div class="ml-auto">
                    <v-select v-model="select" :items="items" variant="outlined" dense hide-details></v-select>
                </div> -->
            </div>
            <v-table class="month-table mt-5 mb-0">
                <template v-slot:default>
                    <thead>
                        <tr>
                            <th class="text-subtitle-1 font-weight-medium">PcID</th>
                            <th class="text-subtitle-1 font-weight-medium">NamePC</th>
                            
                            <th class="text-subtitle-1 font-weight-medium">Status</th>
                            <th class="text-subtitle-1 font-weight-medium">Time Onlines</th>
                            <th class="text-subtitle-1 font-weight-medium">Time remaining</th>
                            <th class="text-subtitle-1 font-weight-medium">Date</th>
                            <th class="text-subtitle-1 font-weight-medium">Network</th>
                            <th class="text-subtitle-1 font-weight-medium">Hardware</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="item in projectTableData" :key="item.PcID" :class="'active'"
                            class="month-item">
                            <td>
                                <div class="d-flex align-center">
                                    <v-avatar size="40">
                                        <img :src="img1" alt="user" width="45" />
                                    </v-avatar>
                                    <div class="mx-4">
                                        <h4 class="text-h6 text-no-wrap">
                                            {{ item.PcID }}
                                        </h4>
                                        <h6 class="text-subtitle-1 text-medium-emphasis text-no-wrap font-weight-medium mt-1">
                                            {{ item.NamePC }}
                                        </h6>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <h5 class="text-subtitle-1 text-medium-emphasis text-no-wrap font-weight-medium ">
                                    {{ item.NamePC }}
                                </h5>
                            </td>
                           
                           
                            <td>
                                <v-chip class="ma-2" :color="'low'" size="small" label>{{ item.Status }}</v-chip>
                            </td>
                            <td>
                                <v-chip class="ma-2" :color="'low'" size="small" label>{{ '01:22' }}</v-chip>
                            </td>
                            <td>
                                <v-chip class="ma-2" :color="'low'" size="small" label>{{ '11:22' }}</v-chip>
                            </td>
                            <td>
                                <v-chip class="ma-2" :color="'low'" size="small" label>{{ Date.now() }}</v-chip>
                            </td>
                            <td>
                                <h4 class="text-subtitle-1 text-medium-emphasis text-no-wrap font-weight-medium">{{ item.Network.ipV4 }}</h4>
                                <h4 class="text-subtitle-1 text-medium-emphasis text-no-wrap font-weight-medium">{{ item.Network.speed }} Mbp</h4>
                            </td>
                            <td>
                                <v-chip class="ma-2" :color="'low'" size="small" label>{{ item.cpu }}</v-chip>
                                <v-chip class="ma-2" :color="'low'" size="small" label>{{ item.vga[0].Model }}</v-chip>
                                <v-chip class="ma-2" :color="'low'" size="small" label>Ram: {{ item.ram.TotalRAM }}</v-chip>
                            </td>
                        </tr>
                    </tbody>
                </template>
            </v-table>
        </v-card-text>
    </VCard>
</template>