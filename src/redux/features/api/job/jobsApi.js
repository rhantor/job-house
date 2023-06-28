import { firestore } from "@/firebase";
import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import {
  addDoc,
  arrayUnion,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import emailjs from "@emailjs/browser";

export const jobsApi = createApi({
  reducerPath: "jobApi",
  tagTypes: ["job", "jobs", "clientJobs", "proposal"],
  baseQuery: fakeBaseQuery(),

  endpoints: (builder) => ({
    addJob: builder.mutation({
      async queryFn(data) {
        try {
          await addDoc(collection(firestore, "jobs"), {
            ...data,
            timestamp: serverTimestamp(),
          });
          return { data: "ok" };
        } catch (err) {
          return { error: err };
        }
      },
      invalidatesTags: ["jobs", "job", "clientJobs"],
    }),
    fetchJobs: builder.query({
      async queryFn() {
        try {
          const jobRef = collection(firestore, "jobs");
          const querySnapshot = await getDocs(jobRef);
          let jobs = [];
          querySnapshot?.forEach((doc) => {
            jobs.push({
              id: doc.id,
              ...doc.data(),
            });
          });
          // Sort the jobs array based on the timestamp property
          jobs.sort((b, a) => {
            const timestampA = a?.timestamp?.toDate()?.getTime();
            const timestampB = b?.timestamp?.toDate()?.getTime();
            return timestampA - timestampB;
          });
          return { data: jobs };
        } catch (err) {
          return { error: err };
        }
      },
      providesTags: ["jobs"],
    }),
    fetchJob: builder.query({
      async queryFn(jobId) {
        try {
          const jobRef = doc(firestore, "jobs", jobId);
          const docSnapshot = await getDoc(jobRef);
          const jobData = docSnapshot.data();
          return { data: jobData };
        } catch (err) {
          return { error: err };
        }
      },
      providesTags: ["job"],
    }),
    deleteJob: builder.mutation({
      async queryFn(jobId) {
        try {
          await deleteDoc(doc(firestore, "jobs", jobId));
          return { data: "ok" };
        } catch (err) {
          return { error: err };
        }
      },
      invalidatesTags: ["clientJobs", "jobs", "job"],
    }),
    updateJob: builder.mutation({
      async queryFn({ id, data }) {
        try {
          await updateDoc(doc(firestore, "jobs", id), {
            ...data,
            updatedTime: serverTimestamp(),
            update: true,
          });
          return { data: "ok" };
        } catch (err) {
          return { error: err };
        }
      },
      invalidatesTags: ["job", "jobs"],
    }),
    submitProposal: builder.mutation({
      async queryFn(proposalData) {
        try {
          // Add the new proposal
          await addDoc(collection(firestore, "proposalData"), {
            ...proposalData,
            timestamp: serverTimestamp(),
          });

          // Get the updated count of proposals for this job
          const jobRef = doc(firestore, "jobs", proposalData.job_id);
          const docSnapshot = await getDoc(jobRef);
          const jobData = docSnapshot.data();
          const totalProposals = jobData.proposals ? jobData.proposals + 1 : 1;
          await updateDoc(doc(firestore, "jobs", proposalData.job_id), {
            proposals: totalProposals,
            proposalId: arrayUnion(proposalData.freelancer_uid),
          });

          // Send email to the client using EmailJS
          const emailData = {
            to_email: proposalData.to_email,
            from_email: proposalData.from_email,
            from_name: proposalData.from_name,
            subject: proposalData.subject,
            coverLetter: proposalData.coverLetter,
            selfDesc: proposalData.selfDesc,
            terms: proposalData.terms,
          };
          await emailjs.send(
            "service_ns6jxe8",
            "template_kxplale",
            emailData,
            "VrrYupDuebtgZisdc"
          );

          return { data: totalProposals };
        } catch (error) {
          return { error };
        }
      },
      invalidatesTags: ["job", "proposal"],
    }),
    fetchClientJobs: builder.query({
      async queryFn(uid) {
        try {
          const jobRef = collection(firestore, "jobs");
          const querySnapshot = await getDocs(jobRef);
          let clientJobs = [];
          querySnapshot?.forEach((doc) => {
            const checkClient = doc.data()?.uid === uid;

            if (checkClient) {
              clientJobs.push({
                id: doc.id,
                ...doc.data(),
              });
            }
          });
          // Sort the jobs array based on the timestamp property
          clientJobs.sort((b, a) => {
            const timestampA = a?.timestamp?.toDate()?.getTime();
            const timestampB = b?.timestamp?.toDate()?.getTime();
            return timestampA - timestampB;
          });
          return { data: clientJobs };
        } catch (err) {
          return { error: err };
        }
      },
      providesTags: ["clientJobs"],
    }),
    fetchJobsProposal: builder.query({
      async queryFn({ jobId, uid }) {
        try {
          const proposalRef = collection(firestore, "proposalData");
          const querySnapshot = await getDocs(proposalRef);
          let proposals = {};
          querySnapshot?.forEach((doc) => {
            const checkProposal =
              doc.data()?.job_id === jobId &&
              doc.data()?.freelancer_uid === uid;
            if (checkProposal) {
              proposals = {
                id: doc.id,
                ...doc.data(),
              };
            }
          });

          return { data: proposals };
        } catch (err) {
          return { error: err };
        }
      },
    }),
    fetchFreelancerProposals: builder.query({
      async queryFn(uid) {
        try {
          const jobsRef = collection(firestore, "jobs");
          const queryJobs = await getDocs(jobsRef);
          let proposalsJobs = [];
          queryJobs.forEach((doc) => {
            const checkFreelancerUid = doc
              .data()
              ?.proposalId?.some((id) => id === uid);
            if (checkFreelancerUid) {
              proposalsJobs.push({
                id: doc.id,
                ...doc.data(),
              });
            }
          });
          // Sort the jobs array based on the timestamp property
          proposalsJobs.sort((b, a) => {
            const timestampA = a?.timestamp?.toDate()?.getTime();
            const timestampB = b?.timestamp?.toDate()?.getTime();
            return timestampA - timestampB;
          });
          return { data: proposalsJobs };
        } catch (err) {
          return { error: err };
        }
      },
      providesTags: ["proposal"],
    }),
    fetchProposalForClient: builder.query({
      async queryFn(jobId) {
        try {
          const jobsRef = collection(firestore, "proposalData");
          const queryProposals = await getDocs(jobsRef);
          let proposals = [];
          queryProposals.forEach((doc) => {
            const checkJobId = doc.data()?.job_id === jobId;
            if (checkJobId) {
              proposals.push({
                id: doc.id,
                ...doc.data(),
              });
            }
          });
          // Sort the jobs array based on the timestamp property
          proposals.sort((b, a) => {
            const timestampA = a?.timestamp?.toDate()?.getTime();
            const timestampB = b?.timestamp?.toDate()?.getTime();
            return timestampA - timestampB;
          });
          return { data: proposals };
        } catch (err) {
          return { error: err };
        }
      },
      providesTags: ["proposal"],
    }),
  }),
});

export const {
  useFetchJobsQuery,
  useFetchJobQuery,
  useAddJobMutation,
  useDeleteJobMutation,
  useUpdateJobMutation,
  useSubmitProposalMutation,
  useFetchClientJobsQuery,
  useFetchJobsProposalQuery,
  useFetchFreelancerProposalsQuery,
  useFetchProposalForClientQuery,
} = jobsApi;
