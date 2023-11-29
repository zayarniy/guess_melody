function uploadFiles() {
    const fileInput = document.getElementById("fileInput");
    const files = fileInput.files;
    const formData = new FormData();

    for (let i = 0; i < files.length; i++) {
        formData.append("musicFiles[]", files[i]);
    }

    const xhr = new XMLHttpRequest();
    xhr.open("POST", "http://192.168.1.36/upload.php");
    xhr.onload = function() {
        if (xhr.status === 200) {
            document.getElementById("status").textContent = "Файлы успешно загружены!";
        } else {
            document.getElementById("status").textContent = "Произошла ошибка при загрузке файлов.";
        }
    };
    xhr.send(formData);
}