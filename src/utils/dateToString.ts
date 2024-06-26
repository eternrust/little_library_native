/**
 * 서버에서 받아온 Date를 웹에 표시하는 형식에 맞게 변환합니다.
 *
 * 만약 `2024-04-18T08:09:59.054Z`값을 넣어서 함수를 호출하면
 * 1일전 또는 1주일 전 등으로 변환하여 반환합니다.
 */
export const dateToString = (dateString: string) => {
	const today = new Date()
	const date = new Date(dateString)
	let time = (today.getTime() - date.getTime()) / 1000
	if (time < 60) return `${Math.floor(time)}초 전`
	time /= 60
	if (time < 60) return `${Math.floor(time)}분 전`
	time /= 60
	if (time < 24) return `${Math.floor(time)}시간 전`
	time /= 24
	if (time < 7) return `${Math.floor(time)}일 전`
	if (time < 30) return `${Math.floor(time / 7)}주일 전`
	if (time < 365.24) return `${Math.floor(time / 30)}달 전`
	return `${Math.floor(time / 365.24)}년 전`
}
