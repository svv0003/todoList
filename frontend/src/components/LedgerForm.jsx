/*
import React, { useState, useEffect } from 'react';
import apiService from "../service/apiService";

const TodoForm = ({ onSubmit, initialData = {}, isEdit = false }) => {
    const [todoTitle, setTodoTitle] = useState(initialData.title || "");
    const [todoContent, setTodoContent] = useState(initialData.content || "");
    const [priority, setPriority] = useState(initialData.priority || "중간");
    const [dueDate, setDueDate] = useState(initialData.dueDate || "");
    const [todoStatus, setTodoStatus] = useState(initialData.status || "대기중");
    const [errors, setErrors] = useState({});

    // 편집 모드일 때 initialData 변경 시 상태 업데이트
    useEffect(() => {
        if (isEdit && initialData) {
            setTodoTitle(initialData.title || "");
            setTodoContent(initialData.content || "");
            setPriority(initialData.priority || "중간");
            setDueDate(initialData.dueDate || "");
            setTodoStatus(initialData.status || "대기중");
        }
    }, [initialData, isEdit]);

    // 유효성 검사
    const validateForm = () => {
        const newErrors = {};
        if (!todoTitle.trim()) newErrors.todoTitle = "제목을 입력해주세요.";
        if (!todoContent.trim()) newErrors.todoContent = "내용을 입력해주세요.";
        if (!priority) newErrors.priority = "우선순위를 선택해주세요.";
        if (!dueDate) newErrors.dueDate = "마감일을 선택해주세요.";
        // todoStatus는 기본값 있으므로 필수 아님 (원하면 추가 가능)

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // 폼 제출
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            alert("입력란을 확인해주세요.");
            return;
        }

        const todoData = {
            title: todoTitle,
            content: todoContent,
            priority,
            dueDate,
            status: todoStatus,
        };

        try {
            if (onSubmit) {
                // 부모에서 onSubmit 전달 시 사용 (더 유연함)
                await onSubmit(todoData, isEdit);
            } else {
                // 직접 API 호출 (기존 방식)
                if (isEdit) {
                    await apiService.updateTodo(initialData.id, todoData);
                    alert("할 일이 수정되었습니다.");
                } else {
                    await apiService.addTodo(todoData);
                    alert("할 일이 추가되었습니다.");
                }

                // 추가 모드일 때만 초기화
                if (!isEdit) {
                    setTodoTitle("");
                    setTodoContent("");
                    setPriority("중간");
                    setDueDate("");
                    setTodoStatus("대기중");
                }
            }
        } catch (error) {
            console.error(error);
            alert(isEdit ? "수정 중 오류가 발생했습니다." : "추가 중 오류가 발생했습니다.");
        }
    };

    return (
        <div className="todo-write-container">
            <form onSubmit={handleSubmit}>
                <input
                    className="todo-write-input"
                    type="text"
                    placeholder="제목을 입력하세요."
                    value={todoTitle}
                    onChange={(e) => setTodoTitle(e.target.value)}
                />
                {errors.todoTitle && <span className="error">{errors.todoTitle}</span>}

                <textarea
                    className="todo-write-input"
                    placeholder="내용을 입력하세요."
                    value={todoContent}
                    onChange={(e) => setTodoContent(e.target.value)}
                    rows="4"
                />
                {errors.todoContent && <span className="error">{errors.todoContent}</span>}

                <select
                    className="todo-write-input"
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                >
                    <option value="">우선순위 선택</option>
                    <option value="높음">높음</option>
                    <option value="중간">중간</option>
                    <option value="낮음">낮음</option>
                </select>
                {errors.priority && <span className="error">{errors.priority}</span>}

                <input
                    className="todo-write-input"
                    type="date"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                />
                {errors.dueDate && <span className="error">{errors.dueDate}</span>}

                <select
                    className="todo-write-input"
                    value={todoStatus}
                    onChange={(e) => setTodoStatus(e.target.value)}
                >
                    <option value="대기중">대기중</option>
                    <option value="진행중">진행중</option>
                    <option value="완료">완료</option>
                </select>

                <button
                    type="submit"
                    className="write-button"
                    disabled={Object.keys(errors).length > 0}
                >
                    {isEdit ? "수정하기" : "추가하기"}
                </button>
            </form>
        </div>
    );
};









import React, {useState, useEffect} from 'react';
import apiService from "../service/apiService";

const TodoForm = (onSubmit, initialData, isEdit) => {
    const [todoTitle, setTodoTitle] = useState("");
    const [todoContent, setTodoContent] = useState("");
    const [priority, setPriority] = useState("");
    const [dueDate, setDueDate] = useState("");
    const [todoStatus, setTodoStatus] = useState("");
    const [isValidate, setIsValidate] = useState(false);
    const [errors, setErrors] = useState({});

    const handleSubmit = async (e) => {
        e.preventDefault();
        validateForm();
        if(isValidate) {
            try {
                await apiService.addTodo(
                    todoTitle, todoContent, priority, dueDate, todoStatus);
                alert("할 일이 추가되었습니다.");
                setTodoTitle("");
                setTodoContent("");
                setPriority("");
                setDueDate("");
                setTodoStatus("");
            } catch (e) {
                alert("추가하는 과정에서 문제가 발생했습니다.");
            } finally {
                setIsValidate(false);
            }
        } else {
            alert("내용을 확인해주세요.");
        }
    }

    const validateForm = () => {
        if(todoTitle === "") setIsValidate(false);
        if(todoContent === "") setIsValidate(false);
        if(priority === "") setIsValidate(false);
        if(dueDate === "") setIsValidate(false);
        if(todoStatus === "") setIsValidate(false);
    }

    return(
        <>
            <div className="todo-write-container">
                <input
                    className="todo-write-input"
                    type="Text"
                    placeholder={"제목을 입력하세요."}
                    value={todoTitle}
                    onChange={(e) =>
                        setTodoTitle(e.target.value)}
                />
                {errors.todoTitle && <span className="error">{errors.todoTitle}</span>}
                <textarea
                    className="todo-write-input"
                    placeholder="내용을 입력하세요."
                    value={todoContent}
                    onChange={(e)=>
                        setTodoContent(e.target.value)}
                    rows="4"
                />
                <select
                    className="todo-write-input"
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}>
                    <option value="">우선순위 선택</option>
                    <option value="important">중요</option>
                    <option value="standard">보통</option>
                    <option value="notHurry">별로</option>
                </select>

                <button className="write-button"
                        onClick={() => handleSubmit()}
                        disabled={isValidate}
                        style={isValidate ? {opacity:'0.7', cursor: 'not-allowed'} : {}}>
                    {isValidate ? '가입 중...' : '가입'}
                </button>
            </div>
        </>
    )
 */

import React, { useState, useEffect } from 'react';

// 소득 카테고리
export const INCOME_CATEGORY_GROUPS = [
    {
        group: 'REGULAR_INCOME',
        label: '정기 소득',
        items: [
            { value: 'SALARY', label: '월급' },
            { value: 'BONUS', label: '보너스' },
            { value: 'INCENTIVE', label: '상여' },
            { value: 'ALLOWANCE', label: '수당 (식대·교통비·야근수당 등)' },
        ],
    },
    {
        group: 'OTHER_INCOME',
        label: '기타 소득',
        items: [
            { value: 'SIDE_JOB', label: '부수입 (프리랜서·알바)' },
            { value: 'INVESTMENT', label: '투자 수익 (주식·코인)' },
            { value: 'DIVIDEND', label: '배당금' },
            { value: 'INTEREST', label: '이자' },
            { value: 'ALLOWANCE_GIFT', label: '용돈' },
            { value: 'CASH_BACK', label: '환급 / 캐시백' },
            { value: 'ETC_INCOME', label: '기타' },
        ],
    },
];

// 지출 카테고리
export const EXPENSE_CATEGORY_GROUPS = [
    {
        group: 'FIXED',
        label: '고정 지출',
        items: [
            { value: 'RENT', label: '월세 / 전세' },
            { value: 'HOUSING_LOAN', label: '주택 대출 이자' },
            { value: 'UTILITY', label: '공과금 (전기·가스·수도)' },
            { value: 'MANAGEMENT_FEE', label: '관리비' },
            { value: 'COMMUNICATION', label: '통신비' },
            { value: 'INSURANCE', label: '보험료' },
            { value: 'SUBSCRIPTION', label: '구독 서비스' },
        ],
    },
    {
        group: 'LIVING',
        label: '생활비',
        items: [
            { value: 'FOOD', label: '식비' },
            { value: 'DINING_OUT', label: '외식' },
            { value: 'CAFE', label: '카페 / 간식' },
            { value: 'MART', label: '마트 / 장보기' },
        ],
    },
    {
        group: 'TRANSPORT',
        label: '교통',
        items: [
            { value: 'PUBLIC_TRANSPORT', label: '대중교통' },
            { value: 'FUEL', label: '주유비' },
            { value: 'TAXI', label: '택시' },
            { value: 'PARKING', label: '주차비' },
        ],
    },
    {
        group: 'CONSUMPTION',
        label: '소비',
        items: [
            { value: 'SHOPPING', label: '쇼핑' },
            { value: 'CLOTHING', label: '의류' },
            { value: 'BEAUTY', label: '미용 / 화장품' },
            { value: 'ELECTRONICS', label: '전자기기' },
        ],
    },
    {
        group: 'LEISURE',
        label: '여가 / 문화',
        items: [
            { value: 'TRAVEL', label: '여행' },
            { value: 'MOVIE', label: '영화 / 공연' },
            { value: 'HOBBY', label: '취미' },
            { value: 'GAME', label: '게임' },
            { value: 'BOOK', label: '도서' },
        ],
    },
    {
        group: 'HEALTH',
        label: '건강',
        items: [
            { value: 'HOSPITAL', label: '병원' },
            { value: 'PHARMACY', label: '약국' },
            { value: 'FITNESS', label: '헬스 / PT' },
        ],
    },
    {
        group: 'EDUCATION',
        label: '교육',
        items: [
            { value: 'ACADEMY', label: '학원' },
            { value: 'ONLINE_COURSE', label: '온라인 강의' },
            { value: 'BOOK_EDU', label: '교재' },
        ],
    },
    {
        group: 'FINANCE',
        label: '금융',
        items: [
            { value: 'LOAN', label: '대출 상환' },
            { value: 'INTEREST_EXPENSE', label: '이자' },
            { value: 'FEE', label: '수수료' },
            { value: 'CARD_PAYMENT', label: '카드값' },
        ],
    },
    {
        group: 'ETC',
        label: '기타',
        items: [
            { value: 'EVENT', label: '경조사' },
            { value: 'GIFT', label: '선물' },
            { value: 'DONATION', label: '기부' },
            { value: 'ETC_EXPENSE', label: '기타' },
        ],
    },
];


export const PAYMENT_METHODS = [
    {
        group: 'INCOME',
        label: '소득 수단',
        items: [
            { value: 'CASH', label: '현금' },
            { value: 'TRANSFER', label: '계좌이체' },
            { value: 'WOORI_BANK_MAJOR', label: '우리은행 주거래통장' },
            { value: 'WOORI_BANK_MINOR', label: '우리은행 입출금통장' },
        ],
    },
    {
        group: 'EXPENSE',
        label: '지출 수단',
        items: [
            { value: 'CASH', label: '현금' },
            { value: 'TRANSFER', label: '계좌이체' },
            { value: 'WOORI_CARD_IU', label: '우리카드 IU' },
            { value: 'WOORI_CARD_TRAVEL', label: '우리카드 Travel' },
            { value: 'HYUNDAI_CARD_THE_PINK', label: '현대카드 The Pink' },
            { value: 'LOTTE_CARD_LAS_VEGAS', label: '롯데카드 Las Vegas' },
        ],
    },
];


export const PAYMENT_INSTALLMENT = [
    {
        group: 'INCOME',
        label: '할부 수',
        items: [
            { value: '0', label: '(없음)' },
        ],
    },
    {
        group: 'EXPENSE',
        label: '할부 수',
        items: [
            { value: '1', label: '일시불' },
            { value: '2', label: '2개월' },
            { value: '3', label: '3개월' },
            { value: '4', label: '4개월' },
            { value: '5', label: '5개월' },
            { value: '6', label: '6개월' },
            { value: '7', label: '7개월' },
            { value: '8', label: '8개월' },
            { value: '9', label: '9개월' },
            { value: '10', label: '10개월' },
            { value: '11', label: '11개월' },
            { value: '12', label: '12개월' },
        ],
    },
];



const LedgerForm = ({ onSubmit, initialData, isEdit }) => {
    const [ledgerPrice, setLedgerPrice] = useState(0);
    const [ledgerDescription, setLedgerDescription] = useState('');
    const [ledgerPayment, setLedgerPayment] = useState('');
    const [ledgerPaymentDate, setLedgerPaymentDate] = useState('');
    const [ledgerPaymentPeriod, setLedgerPaymentPeriod] = useState(0);

    const [ledgerType, setLedgerType] = useState('EXPENSE');
    const [ledgerCategoryGroup, setLedgerCategoryGroup] = useState('');
    const [ledgerCategory, setLedgerCategory] = useState('');

    const ledgerCategoryGroups =
        ledgerType === 'INCOME'
            ? INCOME_CATEGORY_GROUPS
            : EXPENSE_CATEGORY_GROUPS;

    const selectedGroup = ledgerCategoryGroups.find(
        (g) => g.group === ledgerCategoryGroup
    );

    const paymentGroup = PAYMENT_METHODS.find(
        (g) => g.group === ledgerType
    );

    const paymentPeriod = PAYMENT_INSTALLMENT.find(
        (g) => g.group === ledgerType
    );

    useEffect(() => {
        if (initialData) {
            setLedgerType(initialData.ledgerType || '');
            setLedgerCategoryGroup(initialData.ledgerCategoryGroup || '');
            setLedgerCategory(initialData.ledgerCategory || '');
            setLedgerPrice(initialData.ledgerPrice || 0);
            setLedgerPayment(initialData.ledgerPayment || '');
            setLedgerPaymentDate(initialData.ledgerPaymentDate || '');
            setLedgerPaymentPeriod(initialData.ledgerPaymentPeriod || 0);
            setLedgerDescription(initialData.ledgerDescription || '');
        }
    }, [initialData]);

    const validateForm = () => {
        if (ledgerPrice <= 0) return false;
        if (!ledgerType) return false;
        if (!ledgerCategoryGroup) return false;
        if (!ledgerCategory) return false;
        if (!ledgerPrice) return false;
        if (!ledgerPayment) return false;
        if (!ledgerPaymentDate) return false;
        if (!ledgerPaymentPeriod) return false;
        if (!ledgerDescription.trim()) return false;
        return true;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!validateForm()) {
            alert('항목을 모두 입력해주세요.');
            return;
        }

        const ledgerData = {
            ledgerType,
            ledgerCategoryGroup,
            ledgerCategory,
            ledgerPrice: Number(ledgerPrice),
            ledgerPayment,
            ledgerPaymentDate,
            ledgerPaymentPeriod,
            ledgerDescription,
        };

        if (isEdit && initialData) {
            ledgerData.ledgerId = initialData.ledgerId;
        }

        onSubmit(ledgerData);
    };

    return (
        <form className="todo-form" onSubmit={handleSubmit}>
            <div className="form-row three">
                {/* 거래 유형 */}
                <div className="form-group">
                    <label>구분</label>
                    <select
                        value={ledgerType}
                        onChange={(e) => {
                            setLedgerType(e.target.value);
                            setLedgerCategoryGroup('');
                            setLedgerCategory('');

                        }}>
                        <option value="INCOME">소득</option>
                        <option value="EXPENSE">지출</option>
                    </select>
                </div>

                {/* 카테고리 그룹 */}
                <div className="form-group">
                    <label>카테고리</label>
                    <select
                        value={ledgerCategoryGroup}
                        onChange={(e) => {
                            setLedgerCategoryGroup(e.target.value);
                            setLedgerCategory('');
                        }}>
                        <option value="">선택하세요</option>
                        {ledgerCategoryGroups.map((group) => (
                            <option key={group.group} value={group.group}>
                                {group.label}
                            </option>
                        ))}
                    </select>
                </div>

                {/* 서브 카테고리 */}
                <div className="form-group">
                    <label>상세 내역</label>
                    <select
                        value={ledgerCategory}
                        onChange={(e) => setLedgerCategory(e.target.value)}
                        disabled={!ledgerCategoryGroup}
                        required>
                        {!ledgerCategoryGroup && (
                            <option value="">
                                선택하세요
                            </option>
                        )}
                        {ledgerCategoryGroup && (
                            <>
                                <option value="">선택하세요</option>
                                {selectedGroup.items.map((item) => (
                                    <option key={item.value} value={item.value}>
                                        {item.label}
                                    </option>
                                ))}
                            </>
                        )}
                    </select>
                </div>
            </div>

            <div className="form-row fourtotwo">
                <div className="form-group">
                    <label htmlFor="dueDate">마감일</label>
                    <input
                        type="date"
                        id="ledgerPaymentDate"
                        value={ledgerPaymentDate}
                        onChange={(e) =>
                            setLedgerPaymentDate(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label>결제 수단</label>
                    <select
                        value={ledgerPayment}
                        onChange={(e) =>
                            setLedgerPayment(e.target.value)}>
                        <option value="">선택하세요</option>
                        {paymentGroup?.items.map((item) => (
                            <option key={item.value} value={item.value}>
                                {item.label}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="form-group">
                    <label>할부</label>
                    <select
                        value={ledgerPaymentPeriod}
                        onChange={(e) =>
                            setLedgerPaymentPeriod(e.target.value)}>
                        <option value="">선택하세요</option>
                        {paymentPeriod?.items.map((item) => (
                            <option key={item.value} value={item.value}>
                                {item.label}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="form-group">
                <label htmlFor="todoTitle">금액</label>
                {/*<input*/}
                {/*    type="number"*/}
                {/*    value={ledgerPrice}*/}
                {/*    onChange={(e) =>*/}
                {/*        setLedgerPrice(e.target.value)}*/}
                {/*    required*/}
                {/*/>*/}
                <input
                    type="text"
                    inputMode="decimal"
                    pattern="[0-9,]*"
                    value={ledgerPrice === 0 ? '' : Number(ledgerPrice).toLocaleString('ko-KR')}
                    onChange={(e) => {
                        const value = e.target.value.replace(/,/g, '');
                        if (value === '' || /^\d+$/.test(value)) {
                            setLedgerPrice(value === '' ? 0 : Number(value));
                        }
                    }}
                    required
                />
            </div>

            <div className="form-group">
                <label htmlFor="todoContent">내용</label>
                <textarea
                    value={ledgerDescription}
                    onChange={(e) =>
                        setLedgerDescription(e.target.value)}
                    rows={1}/>
            </div>

            <button type="submit" className="submit-btn">
                {isEdit ? '수정하기' : '등록하기'}
            </button>
        </form>
    );
};

export default LedgerForm;