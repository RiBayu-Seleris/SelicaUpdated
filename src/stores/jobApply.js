import { defineStore } from "pinia";

export const useJobApplyStore = defineStore("jobApply", {
  state: () => ({
    selectedJobId: localStorage.getItem("selectedJobId") || null,
    selectedJobData:
      JSON.parse(localStorage.getItem("selectedJobData")) || null,
  }),

  actions: {
    setJob(job) {
      this.selectedJobId = job.id;
      this.selectedJobData = job;

      // Simpan ke localStorage
      localStorage.setItem("selectedJobId", job.id);
      localStorage.setItem("selectedJobData", JSON.stringify(job));
    },

    clearJob() {
      this.selectedJobId = null;
      this.selectedJobData = null;

      // Hapus localStorage
      localStorage.removeItem("selectedJobId");
      localStorage.removeItem("selectedJobData");
    },
  },
});
