import { useState } from "react";
import "./App.css";
import axios from "axios";

type Student = {
    id: string;
    name: string;
    classification: number;
};
type UpsertStudent = {
    id?: string;
    name: string;
    classification: number;
};

const BACKEND_URL_BASE = "/api";

function App() {
    const [studentList, setStudentList] = useState<Student[]>([]);
    const [student, setStudent] = useState<Student | null>(null);
    const [upsertStatus, setUpsertStatus] = useState<number | null>(null);
    const [deleteStatus, setDeleteStatus] = useState<number | null>(null);
    const [updateClassificationStatus, setUpdateClassificationStatus] =
        useState<number | null>(null);

    const getStudents = async () => {
        const url = `${BACKEND_URL_BASE}/students`;
        const { data, status } = await axios.get<Student[]>(url);

        if (status !== 200) throw new Error("Failed to fetch students");

        setStudentList(data);
    };

    const getStudentById = async (id: string) => {
        const url = `${BACKEND_URL_BASE}/student/${id}`;
        const { data, status } = await axios.get<Student>(url);

        if (status !== 200) throw new Error("Failed to fetch student");

        setStudent(data);
    };

    const upsertStudent = async (student: UpsertStudent) => {
        const url = `${BACKEND_URL_BASE}/student`;
        const { status } = await axios.post(url, student);

        if (status !== 200) throw new Error("Failed to upsert student");

        setUpsertStatus(status);
    };

    const deleteStudent = async (id: string) => {
        const url = `${BACKEND_URL_BASE}/student/${id}`;
        const { status } = await axios.delete(url);

        if (status !== 200) throw new Error("Failed to delete student");

        setDeleteStatus(status);
    };

    const updateStudentClassification = async (
        id: string,
        classification: number
    ) => {
        const url = `${BACKEND_URL_BASE}/student/${id}/${classification}`;
        const { status } = await axios.put(url);

        if (status !== 200)
            throw new Error("Failed to update student classification");

        setUpdateClassificationStatus(status);
    };

    return (
        <div className="app">
            <div className="endpoint-test-container">
                <button
                    onClick={() => {
                        getStudents();
                    }}
                >
                    Verify GetStudents Works
                </button>

                <p>Students: {studentList.length}</p>
            </div>

            <div className="endpoint-test-container">
                <button
                    onClick={() => {
                        if (studentList.length === 0) return;

                        getStudentById(studentList[0].id);
                    }}
                >
                    Verify GetStudentById Works
                </button>

                {student && <p>Student: {student.name}</p>}
            </div>

            <div className="endpoint-test-container">
                <button
                    onClick={() => {
                        upsertStudent({
                            classification: 1,
                            name: "Billy Bob",
                        });
                    }}
                >
                    Verify UpsertStudent Works
                </button>

                {upsertStatus && <p>Student Upserted</p>}
            </div>

            <div className="endpoint-test-container">
                <button
                    onClick={() => {
                        if (studentList.length === 0) return;

                        deleteStudent(studentList[0].id);
                    }}
                >
                    Verify DeleteStudent Works
                </button>

                {deleteStatus && <p>Student Deleted</p>}
            </div>

            <div className="endpoint-test-container">
                <button
                    onClick={() => {
                        if (studentList.length === 0) return;

                        updateStudentClassification(studentList[0].id, 2);
                    }}
                >
                    Verify UpdateStudentClassification Works
                </button>

                {updateClassificationStatus && (
                    <p>Student Classification Updated</p>
                )}
            </div>
        </div>
    );
}

export default App;
