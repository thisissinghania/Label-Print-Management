<template>
  <popup-area :sizeSM="`12`" :sizeMD="`8`" :sizeLG="`5`">
    <template v-slot:modalTitle>
      <page-loader v-if="loader" />
      <h3>Upload Asset</h3>
      <button class="close" @click="$emit('closeModal')">
        <img src="@/assets/ticket-it/images/close-modal.svg" alt="close-modal" />
      </button>
    </template>
    <template v-slot:modalContent>
      <VeeForm id="new-bacth-form" @submit="submit" :validation-schema="validationSchema">
        <v-row>
          <v-col class="custom-field" cols="12" sm="12" md="12">
            <v-col class="drop-image pa-0">
              <v-col v-if="selectedFileNames?.length > 0" class="selected-file-name">
                <ul>
                  <li v-for="fileName in selectedFileNames" :key="fileName">{{ fileName }}</li>
                </ul>
              </v-col>
              <v-col v-if="isUploading" class="text-center"
                ><v-progress-circular :width="3" color="green" indeterminate></v-progress-circular
              ></v-col>

              <label class="d-flex flex-wrap pt-6 pb-6" @dragover.prevent @drop="handleFileDrop">
                <Field
                  name="imageFile"
                  type="file"
                  @change="handleFileChange($event)"
                  v-model="formData.imageFile"
                  accept=".zip, .png"
                  multiple
                />
                <v-col cols="12" class="pa-0 text-center mb-2"
                  ><img src="@/assets/ticket-it/images/upload.svg" alt="upload"
                /></v-col>
                <v-col cols="12" class="pa-0 text-center upload-label mb-2"
                  >Drag & Drop to Upload File <br />
                  OR</v-col
                >
                <v-col cols="12" class="pa-0 d-flex justify-center"
                  ><span class="blank_cta">Browse File</span></v-col
                >
              </label>
            </v-col>
            <ErrorMessage name="imageFile" />
          </v-col>
        </v-row>
        <v-col class="pa-0 mt-5">
          <fill-button class="green-bg small-font-cta">Upload</fill-button>
        </v-col>
      </VeeForm>
    </template>
  </popup-area>
</template>

<script>
import { defineComponent, ref, computed, watch } from 'vue'
import PageLoader from '@/components/ticket-it/loader/Loader.vue'
import { ErrorMessage, Form as VeeForm, Field } from 'vee-validate'
import Popover from '@/components/ticket-it/modals/AllModals.vue'
import FillButton from '@/components/ticket-it/buttons/FillButton.vue'
import { validationSchema } from '@/core/ticket-it/validations/ImageManagement.js'
import { Actions } from '@/store/ticket-it/enums/StoreEnums.js'
import { useStore } from 'vuex'
import { useToast } from 'vue-toast-notification'

export default defineComponent({
  name: 'upload-assets',
  components: {
    'popup-area': Popover,
    'fill-button': FillButton,
    'page-loader': PageLoader,
    VeeForm,
    Field,
    ErrorMessage
  },
  setup(props, { emit }) {
    const loader = ref(false)
    const toast = useToast()
    const store = useStore()
    const isUploading = ref(false)
    const selectedFileNames = ref([])
    const formData = ref({
      imageFile: []
    })

    const uploadImage = computed(() => {
      return store.getters.uploadImageSuccess
    })
    const error = computed(() => {
      return store.getters.errorImageManagement
    })

    // Upload image file
    const handleFileChangeAndDrop = (event, isDropEvent = false) => {
      event.preventDefault()
      const files = isDropEvent ? event.dataTransfer.files : event.target.files
      if (files && files.length > 0) {
        isUploading.value = true
        try {
          // Clear the formData.imageFile array before appending new files
          formData.value.imageFile = []
          for (const file of files) {
            const fileExtension = file.name.split('.').pop().toLowerCase()
            if (
              fileExtension === 'zip' ||
              (file.type.startsWith('image/') && ['jpeg', 'png'].includes(file.type.split('/')[1]))
            ) {
              formData.value.imageFile.push(file) // Store multiple files
              selectedFileNames.value.push(file.name) // Store file names
            } else {
              alert('Invalid file format. Please select an image file JPEG, PNG or a ZIP file.')
            }
          }
          event.target.value = ''
        } finally {
          isUploading.value = false
        }
      }
    }

    const handleFileChange = (event) => {
      handleFileChangeAndDrop(event, false)
    }
    const handleFileDrop = (event) => {
      handleFileChangeAndDrop(event, true)
    }

    const submit = async (values, { resetForm }) => {
      loader.value = true
      // Separate the image and ZIP files into two arrays
      const imageFiles = []
      const zipFiles = []
      for (const file of formData.value.imageFile) {
        const fileExtension = file.name.split('.').pop().toLowerCase()
        if (['jpeg', 'png'].includes(file.type.split('/')[1])) {
          imageFiles.push(file)
        } else if (fileExtension === 'zip') {
          zipFiles.push(file)
        }
      }
      // Create a FormData object for the selected files
      const formDataToSend = new FormData()
      // Append other form data fields (if any) to the FormData object
      for (const key in values) {
        if (key !== 'imageFile') {
          formDataToSend.append(key, values[key])
        }
      }
      // Check if there are image files to send
      if (imageFiles.length > 0) {
        // Append each image file to the FormData object in a loop
        for (const imageFile of imageFiles) {
          formDataToSend.append('imageFiles', imageFile) // Use [] to create an array of files
        }
      }
      // Check if there are ZIP files to send
      if (zipFiles.length > 0) {
        // Append each ZIP file to the FormData object in a loop
        for (const zipFile of zipFiles) {
          formDataToSend.append('imageFiles', zipFile) // Use [] to create an array of files
        }
      }
      // Dispatch action to upload all files
      await store.dispatch(Actions.UPLOAD_IMAGE, formDataToSend)
      resetForm()
      selectedFileNames.value = []
    }

    watch(uploadImage, (newValue) => {
      toast.clear()
      if (newValue) {
        loader.value = false
        emit('closeModal')
        emit('fetchImages')
        toast.success(uploadImage.value.successMessage, {
          position: 'top-right'
        })
      }
    })
    watch(error, (newValue) => {
      toast.clear()
      if (newValue) {
        loader.value = false
      }
    })

    return {
      validationSchema,
      submit,
      formData,
      selectedFileNames,
      isUploading,
      handleFileDrop,
      handleFileChange,
      loader
    }
  }
})
</script>
