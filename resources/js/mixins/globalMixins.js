
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
               /*  didOpen: (toast) => {
                  toast.addEventListener('mouseenter', this.$swal.stopTimer)
                  toast.addEventListener('mouseleave', this.$swal.resumeTimer)
                } */
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
               /*  didOpen: (toast) => {
                    toast.addEventListener('mouseenter', this.$swal.stopTimer)
                    toast.addEventListener('mouseleave', this.$swal.resumeTimer)
                } */
              })
        },
       async showDelete(callback){
           this.$swal({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#B71C1C',
                cancelButtonColor: '#6c757d',
                confirmButtonText: 'Confirm'
              }).then((confirmed) => {
                callback(confirmed && confirmed.value == true);
            });
        },
        async showConfirm(callback){
          this.$swal({
               title: 'Are you sure?',
               text: "Your about to send announcement message to all registered patients",
               icon: 'warning',
               showCancelButton: true,
               confirmButtonColor: '#388E3C',
               cancelButtonColor: '#6c757d',
               confirmButtonText: 'Confirm'
             }).then((confirmed) => {
               callback(confirmed && confirmed.value == true);
           });
       },
    },
  }