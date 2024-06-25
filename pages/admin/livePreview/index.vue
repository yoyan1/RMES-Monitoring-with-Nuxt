<script setup>
import QRCodeVue3 from "qrcode-vue3";
</script>
<template>
     <QRCodeVue3
          :width="200"
          :height="200"
          value="sdgdg"
          image="RMES-logo.png"
          :qrOptions="{ typeNumber: 0, mode: 'Byte', errorCorrectionLevel: 'Q' }"
          :imageOptions="{ hideBackgroundDots: true, imageSize: 0.3, margin: 2 }"
          :dotsOptions="{ type: 'square', color: 'black',}"
          :backgroundOptions="{ color: '#ffffff' }"
          :cornersSquareOptions="{ type: 'extra-rounded', color: '#000000' }"
          :cornersDotOptions="{ type: 'square', color: 'blue' }"
          fileExt="png"
          :download="true"
          myclass="my-qur"
          imgclass="img-qr"
          downloadButton="my-button"
          :downloadOptions="{ name: 'vqr', extension: 'png' }"
        />
</template>