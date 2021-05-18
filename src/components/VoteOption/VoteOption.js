export default function VoteOption({ option, deleteItem }) {

    return (
        <div className="optionTxt">{option.text}
            <button type="button" className="close" onClick={() => deleteItem(option.id)}><span aria-hidden="true">×</span><span className="sr-only">Close</span></button>
        </div>
    )
}