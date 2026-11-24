<script setup>
import { reactive, ref } from 'vue'
import { apiService } from '@/services/api'
import BaseButton from '@/components/common/BaseButton.vue'
import BaseModal from '@/components/common/BaseModal.vue'

const form = reactive({
  name: '',
  email: '',
  subject: '',
  message: ''
})

const errors = reactive({
  name: '',
  email: '',
  message: ''
})

const isSubmitting = ref(false)
const showSuccessModal = ref(false)
const successData = ref(null)
const serverError = ref('')

const validateEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

const validate = () => {
  let isValid = true
  errors.name = ''
  errors.email = ''
  errors.message = ''
  serverError.value = ''

  if (!form.name.trim()) {
    errors.name = 'Nama lengkap wajib diisi.'
    isValid = false
  }

  if (!form.email.trim()) {
    errors.email = 'Alamat email wajib diisi.'
    isValid = false
  } else if (!validateEmail(form.email.trim())) {
    errors.email = 'Format email tidak valid.'
    isValid = false
  }

  if (!form.message.trim()) {
    errors.message = 'Pesan wajib diisi.'
    isValid = false
  } else if (form.message.trim().length < 10) {
    errors.message = 'Pesan minimal berisi 10 karakter.'
    isValid = false
  }

  return isValid
}

const handleSubmit = async () => {
  if (!validate()) return

  isSubmitting.value = true
  serverError.value = ''

  try {
    const res = await apiService.submitContact({
      name: form.name.trim(),
      email: form.email.trim(),
      subject: form.subject.trim() || 'Pertanyaan Umum',
      message: form.message.trim()
    })

    successData.value = res
    showSuccessModal.value = true

    // Reset Form
    form.name = ''
    form.email = ''
    form.subject = ''
    form.message = ''
  } catch (err) {
    serverError.value = err.message || 'Gagal mengirim formulir ke server API.'
  } finally {
    isSubmitting.value = false
  }
}
</script>

<template>
  <div class="max-w-[1280px] mx-auto px-6 py-12 space-y-12">
    
    <!-- Editorial Header Section -->
    <div class="max-w-3xl space-y-3 pb-4">
      <div class="text-xs font-mono text-ink-muted uppercase tracking-wider">
        Komunikasi &bull; Kolaborasi
      </div>
      <h1 class="text-3xl sm:text-5xl font-sans font-medium tracking-tightest text-ink dark:text-canvas">
        Kontak &amp; Tautan <span class="font-serif italic font-normal text-[1.1em]">Profesional</span>
      </h1>
      <p class="text-sm text-ink-muted leading-relaxed font-sans max-w-xl">
        Kirimkan pesan Anda mengenai tinjauan tugas, ide kolaborasi, atau pertanyaan teknis antarmuka kepada KELOMPOK 2.
      </p>
    </div>

    <!-- Main Grid -->
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-10">
      
      <!-- Form Column (Col 7) -->
      <div class="lg:col-span-7 bg-surface dark:bg-[#181A20] p-7 sm:p-9 rounded-card border border-border shadow-card space-y-6">
        <div class="flex items-center justify-between">
          <h2 class="text-lg font-sans font-semibold text-ink dark:text-canvas">
            Formulir Kontak
          </h2>
          <span class="text-xs font-mono text-ink-muted">POST /api/contact</span>
        </div>

        <!-- Server Error Alert -->
        <div
          v-if="serverError"
          class="p-4 rounded-xl bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900/40 text-red-700 dark:text-red-300 text-xs font-mono"
        >
          {{ serverError }}
        </div>

        <form @submit.prevent="handleSubmit" class="space-y-4" novalidate>
          
          <!-- Name -->
          <div>
            <label class="block text-xs font-mono text-ink dark:text-canvas mb-1.5 uppercase">
              Nama Lengkap *
            </label>
            <input
              v-model="form.name"
              type="text"
              placeholder="Masukkan nama Anda..."
              class="w-full px-4 py-2.5 text-sm rounded-xl bg-surface-subtle dark:bg-[#20232A] border border-border text-ink dark:text-canvas placeholder-ink-muted focus:outline-none focus:border-ink/40 transition"
              :class="{ 'border-red-500': errors.name }"
            />
            <p v-if="errors.name" class="mt-1 text-xs text-red-500 font-mono">
              {{ errors.name }}
            </p>
          </div>

          <!-- Email -->
          <div>
            <label class="block text-xs font-mono text-ink dark:text-canvas mb-1.5 uppercase">
              Alamat Email *
            </label>
            <input
              v-model="form.email"
              type="email"
              placeholder="nama@email.com"
              class="w-full px-4 py-2.5 text-sm rounded-xl bg-surface-subtle dark:bg-[#20232A] border border-border text-ink dark:text-canvas placeholder-ink-muted focus:outline-none focus:border-ink/40 transition"
              :class="{ 'border-red-500': errors.email }"
            />
            <p v-if="errors.email" class="mt-1 text-xs text-red-500 font-mono">
              {{ errors.email }}
            </p>
          </div>

          <!-- Subject -->
          <div>
            <label class="block text-xs font-mono text-ink dark:text-canvas mb-1.5 uppercase">
              Topik / Subjek
            </label>
            <input
              v-model="form.subject"
              type="text"
              placeholder="Contoh: Feedback Tugas UI Lanjut"
              class="w-full px-4 py-2.5 text-sm rounded-xl bg-surface-subtle dark:bg-[#20232A] border border-border text-ink dark:text-canvas placeholder-ink-muted focus:outline-none focus:border-ink/40 transition"
            />
          </div>

          <!-- Message -->
          <div>
            <label class="block text-xs font-mono text-ink dark:text-canvas mb-1.5 uppercase">
              Isi Pesan *
            </label>
            <textarea
              v-model="form.message"
              rows="4"
              placeholder="Tuliskan pesan Anda di sini..."
              class="w-full px-4 py-2.5 text-sm rounded-xl bg-surface-subtle dark:bg-[#20232A] border border-border text-ink dark:text-canvas placeholder-ink-muted focus:outline-none focus:border-ink/40 transition resize-none"
              :class="{ 'border-red-500': errors.message }"
            ></textarea>
            <p v-if="errors.message" class="mt-1 text-xs text-red-500 font-mono">
              {{ errors.message }}
            </p>
          </div>

          <div class="pt-2">
            <BaseButton
              type="submit"
              variant="primary"
              size="lg"
              :loading="isSubmitting"
              class="w-full"
            >
              <span>{{ isSubmitting ? 'Mengirim Data...' : 'Kirim Pesan' }}</span>
            </BaseButton>
          </div>

        </form>
      </div>

      <!-- Info Column (Col 5) -->
      <div class="lg:col-span-5 space-y-6">
        
        <div class="bg-surface-subtle dark:bg-[#181A20] p-7 sm:p-8 rounded-card border border-border shadow-card space-y-6">
          <h3 class="text-base font-sans font-semibold text-ink dark:text-canvas">
            Kanal Resmi KELOMPOK 2
          </h3>

          <div class="space-y-3 font-mono text-xs">
            
            <a
              href="mailto:kelompok2@ui-lanjut.dev"
              class="flex items-center justify-between p-3.5 rounded-xl bg-canvas dark:bg-[#20232A] border border-border hover:border-ink/30 transition text-ink dark:text-canvas"
            >
              <span class="text-ink-muted">Email:</span>
              <span class="font-medium">kelompok2@ui-lanjut.dev</span>
            </a>

            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              class="flex items-center justify-between p-3.5 rounded-xl bg-canvas dark:bg-[#20232A] border border-border hover:border-ink/30 transition text-ink dark:text-canvas"
            >
              <span class="text-ink-muted">GitHub:</span>
              <span class="font-medium">github.com/kelompok-2-ui-lanjut</span>
            </a>

            <div class="flex items-center justify-between p-3.5 rounded-xl bg-canvas dark:bg-[#20232A] border border-border text-ink dark:text-canvas">
              <span class="text-ink-muted">Institusi:</span>
              <span class="font-medium">Fakultas Ilmu Komputer</span>
            </div>

          </div>
        </div>

      </div>

    </div>

    <!-- Success Modal -->
    <BaseModal
      :is-open="showSuccessModal"
      title="Pesan Terkirim"
      @close="showSuccessModal = false"
    >
      <div class="space-y-4 py-2 font-sans">
        <p class="text-sm text-ink dark:text-canvas leading-relaxed">
          {{ successData?.message || 'Terima kasih telah menghubungi kami. Pesan Anda telah berhasil terkirim dan tim kami akan segera merespons.' }}
        </p>
      </div>

      <template #footer>
        <BaseButton variant="primary" size="sm" @click="showSuccessModal = false">
          Selesai
        </BaseButton>
      </template>
    </BaseModal>

  </div>
</template>
