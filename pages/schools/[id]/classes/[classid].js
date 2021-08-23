import StudentsUi from '../../../../components/Students/StudentsUi'
import MainUi from '../../../../components/Main/MainUi'

export default function xkcdDetails(props) {
    return (
        <MainUi>
            <StudentsUi classid={props.classid} />
        </MainUi>
    )
}

export async function getServerSideProps(context) {
    const num = context.query.classid;
    return { props: { classid: num } }
}