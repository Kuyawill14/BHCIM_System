
export default {
    methods: {
        showSuccess(message){
              this.$swal.fire({
                icon: 'success',
                title: 'Success',
                text: message,
                showConfirmButton: false,
                timer: 3000,
              })
        },
        showError(message){
                this.$swal.fire({
                icon: 'error',
                title: 'Failed',
                text: message,
                showConfirmButton: false,
                timer: 3000,
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