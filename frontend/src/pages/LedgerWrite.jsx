import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import TodoForm from '../components/TodoForm';
import LedgerForm from "../components/LedgerForm";
import apiService from "../service/apiService";

const LedgerWrite = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const existingLedger = location.state?.ledger;
    const isEdit = !!existingLedger;

    const handleSubmit = async (ledgerData) => {
        try {
            if (isEdit) {
                await apiService.updateLedger(existingLedger.ledgerId, ledgerData);
                alert('수정되었습니다.');
            } else {
                await apiService.addLedger(ledgerData);
                alert('등록되었습니다.');
            }
            navigate('/ledger');
        } catch (error) {
            console.error('저장 실패:', error);
            alert(isEdit
                ? '수정에 실패했습니다.'
                : '등록에 실패했습니다.');
        }
    };

    return (
        <div className="todo-write-page">
            {/*<div className="page-header">*/}
            {/*    <h1>{isEdit ? '업무 수정' : '업무 등록'}</h1>*/}
            {/*</div>*/}

            <div className="form-container">
                <LedgerForm
                    onSubmit={handleSubmit}
                    initialData={existingLedger}
                    isEdit={isEdit}/>
            </div>
        </div>
    );
};

export default LedgerWrite;