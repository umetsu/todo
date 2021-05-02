// 今はtasks側のモデルと同じプロパティになっているが、一覧画面と詳細画面では別のモデルを使いたくなることがよくあるため分けている
export interface Task {
  id: string
  name: string
  completed: boolean
}
