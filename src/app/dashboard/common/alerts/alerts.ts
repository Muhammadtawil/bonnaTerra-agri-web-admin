import Swal from "sweetalert2";



export function successAlert (succesTitle: string){
 return Swal.fire({
    title: "Done!",
    text: `${succesTitle}`,
    icon: "success",
    timer: 3000,
    timerProgressBar: true,
    showConfirmButton: false,
  });
};

export const updateAlert = (updateTitle: string) => {
  Swal.fire({
    title: "Done!",
    text:`${updateTitle}`,
    icon: "success",
    timer: 2000,
    timerProgressBar: true,
    showConfirmButton: false,
  });
};

export const AssignTaskAlert = () => {
  Swal.fire({
    title: "Done!",
    text: " Task Assigned",
    icon: "success",
    timer: 2000,
    timerProgressBar: true,
    showConfirmButton: false,
  });
};


export const deleteAlert = async (deleteMethod: () => Promise<any>) => {
  try {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
      focusConfirm: true,
      allowEscapeKey: true,
    });

    if (result.isConfirmed) {
      await deleteMethod();
      Swal.fire('Deleted!', 'Your task has been deleted.', 'success');
      return true; // Indicate success
    }
    return false; // Indicate cancellation
  } catch (error) {
    Swal.fire('Error!', 'There was a problem deleting the subscriber.', 'error');
    return false; // Indicate failure
  }
};


export const LoginAlert = ({ userName }: any) => {
  Swal.fire({
    title: "Welcome!",
    text: `you are welcome ${userName}`,
    icon: "success",
    timer: 2000,
    timerProgressBar: true,
    showConfirmButton: false,
  });
};