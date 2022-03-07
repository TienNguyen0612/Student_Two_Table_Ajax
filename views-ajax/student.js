let student = 0;

function displayProvinceList() {
    window.open("province.html", "_self");
}

function displayFormCreate() {
    document.getElementById("form").reset();
    document.getElementById("form").hidden = false;
    document.getElementById("form-button").onclick = function () {
        addNewStudent();
    }
}

function showProvince(province) {
    return `<option value="${province.id}">${province.name}</option>`
}

function showProvinces() {
    $.ajax({
        type: "GET",
        url: `http://localhost:8080/api/provinces`,
        success: function (data) {
            let content = "";
            for (let i = 0; i < data.length; i++) {
                content += showProvince(data[i]);
            }
            document.getElementById("province").innerHTML = content;
        }
    });
}

function addNewStudent() {
    //lấy dữ liệu
    let name = $('#name').val();
    let avgPoint = $('#avgPoint').val();
    let imageUrl = $('#imageUrl').val();
    let province = $('#province').val();
    let newStudent = {
        name: name,
        avgPoint: avgPoint,
        imageUrl: imageUrl,
        province: {
            id: province
        }
    };

    //gọi ajax
    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        type: "POST",
        data: JSON.stringify(newStudent),
        //tên API
        url: `http://localhost:8080/api/students`,
        //xử lý khi thành công
        success: function () {
            getStudents();
        }

    });
    //chặn sự kiện mặc định của thẻ
    event.preventDefault();
}

function getStudents() {
    $.ajax({
        type: "GET",
        //tên API
        url: `http://localhost:8080/api/students`,
        //xử lý khi thành công
        success: function (data) {
            // hiển thị danh sách ở đây
            let content = '<tr>\n' +
                '<th>Name</th>\n' +
                '<th>Average Point</th>\n' +
                '<th>Image</th>\n' +
                '<th>Province</th>\n' +
                '<th colspan="2">Action</th>\n' +
                '</tr>';
            for (let i = 0; i < data.length; i++) {
                content += displayStudent(data[i]);
            }
            // document.getElementById("studentList").hidden = false;
            document.getElementById("studentList").innerHTML = content;
            document.getElementById("form").hidden = true;
        }
    });
}

function displayStudent(student) {
    return `<tr><td>${student.name}</td><td>${student.avgPoint}</td><td>${student.imageUrl}</td><td>${student.province.name}</td>
                    <td><button class="btn btn-danger" onclick="deleteStudent(${student.id})"><i class="fa-solid fa-trash"></i></button></td>
                    <td><button class="btn btn-warning" onclick="editStudent(${student.id})"><i class="fa-solid fa-pencil"></i></button></td></tr>`;
}

function deleteStudent(id) {
    if (confirm('Are you sure you want to delete ?') === true) {
        $.ajax({
            type: 'DELETE',
            url: `http://localhost:8080/api/students/${id}`,
            success: function () {
                getStudents()
            }
        });
    }
}

function editStudent(id) {
    $.ajax({
       type: 'GET',
       url: `http://localhost:8080/api/students/${id}`,
        success: function (data) {
           $('#name').val(data.name);
           $('#avgPoint').val(data.avgPoint);
           $('#image').val(data.imageUrl);
           $('#province').val(data.province.id);
           student = data.id;
           document.getElementById("form").hidden = false;
           document.getElementById("form-button").onclick = function () {
             updateStudent()
           };
        }
    });
}

function updateStudent() {
    let name = $('#name').val();
    let avgPoint = $('#avgPoint').val();
    let imageUrl = $('#image').val();
    let province = $('#province').val();
    let newStudent = {
        name: name,
        avgPoint: avgPoint,
        imageUrl: imageUrl,
        province: {
            id: province
        }
    };

    //gọi ajax
    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        type: 'PUT',
        data: JSON.stringify(newStudent),
        //tên API
        url: `http://localhost:8080/api/students/${student}`,
        //xử lý khi thành công
        success: function () {
            getStudents();
        }

    });
    //chặn sự kiện mặc định của thẻ
    event.preventDefault();
}

function searchStudent() {
    let search = document.getElementById('search').value;
    $.ajax({
        type: "GET",
        //tên API
        url: `http://localhost:8080/api/students?search=${search}`,
        //xử lý khi thành công
        success: function (data) {
            // hiển thị danh sách ở đây
            let content = '<tr>\n' +
                '<th>Name</th>\n' +
                '<th>Average Point</th>\n' +
                '<th>Image</th>\n' +
                '<th>Province</th>\n' +
                '<th colspan="2">Action</th>\n' +
                '</tr>';
            for (let i = 0; i < data.length; i++) {
                content += displayStudent(data[i]);
            }
            document.getElementById("studentList").innerHTML = content;
            document.getElementById("search-form").reset();
        }
    });
    event.preventDefault();
}

showProvinces()
getStudents()
