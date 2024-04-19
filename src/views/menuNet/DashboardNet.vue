<script setup lang="ts">
import { ref } from "vue";

import BaseBreadcrumb from "@/components/shared/BaseBreadcrumb.vue";
import WelcomeCard from "../../components/dashboards/analytical/WelcomeCard.vue";
// import TheEarnings from "@/components/dashboards/analytical/TheEarnings.vue";
// import MonthlyRevenue from "@/components/dashboards/analytical/MonthlyRevenue.vue";
// import TheSalesOverview from "@/components/dashboards/analytical/TheSalesOverview.vue";
// import TotalSales from "@/components/dashboards/analytical/TotalSales.vue";
// import ManagerPC from "J:/Project/Project_ManagerNet/DashboardBilling/src/components/MenuNet/ManagerPC.vue";
import ManagerPC from "@/components/MenuNet/ManagerPC.vue";
// import BlogCard from "@/components/dashboards/analytical/BlogCard.vue";
// import WeeklyStats from "@/components/dashboards/analytical/WeeklyStats.vue";
// import DailyActivities from "@/components/dashboards/analytical/DailyActivities.vue";

const page = ref({ title: "MenuNet" });
const breadcrumbs = ref([
  {
    text: "Dashboard",
    disabled: false,
    href: "#",
  },
  {
    text: "MenuNet",
    disabled: true,
    href: "#",
  },
]);
console.log('oki dashboard')
</script>

<template>
  <BaseBreadcrumb :title="page.title" :breadcrumbs="breadcrumbs"></BaseBreadcrumb>
  <v-row>
    <!-- <v-col cols="12" sm="12" lg="8"> q-->
    <!-- <v-col> -->
      <ManagerPC/>
    <!-- </v-col> -->
   
  </v-row>
</template>
