# 달력

### 👉 Installation

```bash
$ npm i @mung-office/calendar
```

### 👉 Usage

```jsx
import { Calendar, DatePicker } from '@mung-office/calendar';
```

* Default

```jsx
<Calendar 
  onSelectDate={date => setSelectDate(date)}
  onSelectDates={dates => setSelectDates(dates)}
  selectDate={selectDate}
  selectDates={selectDates}
  beforeDisablePoint={beforeDisablePoint}
  afterDisablePoint={afterDisablePoint}
  disableDates={disableDates}
/>
```

| Key   |      Type      |  Desc |  Default |
|----------|:-------------|:------|------:|
| onSelectDate|  ([date, number]) => {} | 셀 선택시 선택된 날짜 | () => {} |
| onSelectDates|    ([date, date]) => {}   |   셀을 드래그시 날짜의 시작과 끝 |   () => {} |
| selectDate| [date, number] |   여기에 포함된 날짜는 화면에 표시된다. [선택된 날짜, 요일번호] | [오늘날짜, 오늘요일번호] |
| selectDates|  [date, date] | 여기에 포함된 날짜는 화면에 표시된다.[시작날짜, 마지막 날짜] | [오늘날짜, 오늘날짜] |
| beforeDisablePoint|    date   |  해당 날짜를 기준으로 이전날짜 비활성화 | "" |
| afterDisablePoint| date | 해당 날짜를 기준으로 이후날짜 비활성화 |    "" |
| disableDates|  [date, date, ...] | 비활성화 날짜 목록 | [] |


* Date Picker

```jsx
<DatePicker 
  onChange={date => setSelectDate(date)}
  value={selectDate}
  min={beforeDisablePoint}
  max={afterDisablePoint}
  disableDates={disableDates}
  width={520}
/>
```

| Key   |      Type      |  Desc |  Default |
|----------|:-------------|:------|------:|
| onSelectDate|  ([date, number]) => {} | 셀 선택시 선택된 날짜 | () => {} |
| value| [date, number] |   여기에 포함된 날짜는 화면에 표시된다. [선택된 날짜, 요일번호] | [오늘날짜, 오늘요일번호] |
| min|    date   |  해당 날짜를 기준으로 이전날짜 비활성화 | "" |
| max| date | 해당 날짜를 기준으로 이후날짜 비활성화 |    "" |
| disableDates|  [date, date, ...] | 비활성화 날짜 목록 | [] |
| width|  number | 팝업달력 너비 | 520 |

요일번호는 다음과 같이 정의한다.

```
일요일(0)
월요일(1)
화요일(2)
수요일(3)
목요일(4)
금요일(5)
토요일(6)
```


[DEMO](https://pjt3591oo.github.io/react-calendar/)