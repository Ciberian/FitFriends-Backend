import { ResponseValue } from '../../constants';

type RequestTrainingResponseProps = {
  response: ResponseValue;
};

function RequestTrainingResponse({ response }: RequestTrainingResponseProps): JSX.Element {
  return (
    <div className="thumbnail-friend__request-status thumbnail-friend__request-status--role-user">
      <p className="thumbnail-friend__request-text">
        Запрос на&nbsp;совместную тренировку {response}
      </p>
    </div>
  );
}

export default RequestTrainingResponse;
