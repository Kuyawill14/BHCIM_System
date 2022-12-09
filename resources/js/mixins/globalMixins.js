
export default {
    methods: {
        showSuccess(message){
              this.$swal.fire({
                toast: true,
                icon: 'success',
                title: message,
                position: 'top-right',
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                didOpen: (toast) => {
                  toast.addEventListener('mouseenter', this.$swal.stopTimer)
                  toast.addEventListener('mouseleave', this.$swal.resumeTimer)
                }
              })
        },
        showError(message){
                this.$swal.fire({
                toast: true,
                icon: 'error',
                title: message,
                position: 'top-right',
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                didOpen: (toast) => {
                    toast.addEventListener('mouseenter', this.$swal.stopTimer)
                    toast.addEventListener('mouseleave', this.$swal.resumeTimer)
                }
                })
        },
       async showDelete(callback){
           this.$swal({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#d33',
                cancelButtonColor: '#6c757d',
                confirmButtonText: 'Confirm'
              }).then((confirmed) => {
                callback(confirmed && confirmed.value == true);
            });
        },
      
    
    },
   
  }