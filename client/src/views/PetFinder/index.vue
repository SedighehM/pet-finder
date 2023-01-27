<template>
  <v-container>
    <v-col cols="12">
      <v-row>
        <v-col cols="11">
          <v-combobox
            v-model="selectedValue"
            :items="options"
            label="Show statics based on"
            outlined
          ></v-combobox>
        </v-col>
        <v-col cols="1">
          <v-btn
            :disabled="!selectedValue"
            @click="submit()"
            color="primary"
            dark
            x-large
            data-testid="button"
          >
            Search
          </v-btn>
        </v-col>
      </v-row>
      <v-alert v-show="submitted" data-testid="alert" type="info">
        You selected the option: {{ attribute }}
      </v-alert>
      <v-row>
        <v-col cols="6">
          <v-card>
            <v-data-table
              data-testid="table"
              v-show="submitted"
              :headers="headers"
              :items="tableItems"
              :items-per-page="5"
              class="elevation-1"
            >
              <template v-slot:item.name="{ item }">
                <span>{{ item.name | nullFormatter }}</span>
              </template></v-data-table
            ></v-card
          >
        </v-col>
        <v-col cols="6">
          <v-card height="100%">
            <apexchart
              height="100%"
              v-show="submitted"
              type="pie"
              :options="chartOptions"
              :series="chartData"
            ></apexchart>
          </v-card>
        </v-col>
      </v-row>
    </v-col>
  </v-container>
</template>

<script>
import { getStatics } from "./service";
export default {
  name: "PetFinder",

  data: () => ({
    chartData: [],
    chartOptions: {
      chart: {
        type: "pie",
      },
      labels: [],
    },
    selectedValue: null,
    attribute: null,
    submitted: false,
    options: ["color", "breed", "age", "gender"],
    headers: [
      {
        text: "",
        align: "start",
        sortable: false,
        value: "name",
      },
      { text: "count", value: "count" },
      { text: "percent (%)", value: "percent" },
    ],
    tableItems: [],
  }),
  methods: {
    //fetch statics for a specific attribute and update the table
    submit: function () {
      getStatics(this.selectedValue).then((response) => {
        this.submitted = true;
        this.attribute = this.selectedValue;
        this.headers[0].text = this.selectedValue;
        this.tableItems = response.data;
        this.updateChart(response.data);
      });
    },
    //update chart with new data
    updateChart: function (data) {
      this.chartOptions = { labels: [] };
      this.chartData = [];

      data.forEach((item) => {
        this.chartData.push(item.count);
        this.chartOptions.labels.push(item.name || "unknown");
      });
    },
  },
};
</script>
