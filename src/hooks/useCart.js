import { useEffect, useState } from "react";
import useFirebase from "./useFirebase.js";
import {Redirect, useHistory} from 'react-router-dom'
import useCourses from "./useCourses";


const useCart = () => {
  const { user } = useFirebase();
  const { uid } = user;
  const history = useHistory();
  const {allCourses,setAllCourses, courses,totalPage, currentPage, setCurrentPage,setCourses } = useCourses();

  const [selectedCourse, setSelectedCourse] = useState([]);
  const [allUser, setallUser] = useState('');


  useEffect(() => {
    fetch(`http://localhost:5000/order-list/${uid}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.length) {
          console.log(data);
          console.log('fffff');
          setSelectedCourse(data);
        }
      });
  }, [uid]);

    useEffect(() => {
        fetch("http://localhost:5000/user-list")
            .then((res) => res.json())
            .then((data) => {
                if (data.length) {
                    setallUser(data);
                    console.log(allUser);
                }
            });
    }, [user]);



  function allUserList(){
      fetch(
          "http://localhost:5000/user-list"
      )
          .then((res) => res.json())
          .then((data) => {
              setallUser(data);
              console.log(allUser);
          });
  }



  function addToCart(course) {
    const isHave = selectedCourse.find(
      (selected) => selected._id === course._id
    );
    delete course._id;
    course.uid = uid;
    course.status = "pending";

    if (isHave) {
      alert("service has been selected!");
    } else {
      fetch(
          "http://localhost:5000/course/add", {
        method: "post",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(course),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.insertedId) {
            const newSelection = [...selectedCourse, course];
            setSelectedCourse(newSelection);
            return <Redirect to='/checkout'  />;
          }
        });
    }
  }

  function remove(id,uid) {
    fetch(`http://localhost:5000/order/delete/${id}/${uid}`, {
      method: "delete",
    })
      .then((res) => res.json())
      .then((data) => {

        if (data.deletedCount === 1) {
          const selectAfterRemove = selectedCourse.filter(
            (course) => course._id !== id
          );
          setSelectedCourse(selectAfterRemove);
        } else {
          console.log(data);
          alert("something went wrong!!");
        }
      });
  }




  function getUpdatedCourse() {
    fetch(`http://localhost:5000/order-list`)
        .then((res) => res.json())
        .then((data) => {
          if (data.length) {
            console.log(data);
            console.log('fffff');
            setSelectedCourse(data);
          }
        });
  }


  function statusChange(id,uid,status) {

      fetch(
            `http://localhost:5000/order/status-change/${id}/${uid}`, {
            method: "post",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({status}),
          })
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            getUpdatedCourse();
          });

  }

    function statusChangeToAdmin(uid) {
        const status = 'admin';
        console.log(uid);
        fetch(
            `http://localhost:5000/user/status-change/${uid}`, {
                method: "post",
                headers: { "content-type": "application/json" },
                body: JSON.stringify({status}),
            })
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                if (data.modifiedCount){
                    allUserList();
                }
            });

    }





  return {allUserList,allUser,setallUser, setSelectedCourse, remove, addToCart, selectedCourse,statusChange, statusChangeToAdmin };
};

export default useCart;
