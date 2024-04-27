import Resource from 'src/types/Resource'

interface IResourceVoteControls {
  resource: Resource
  onLike: () => void
  onDislike: () => void
}

export default function ResourceVoteControls({
  resource,
  onLike,
  onDislike,
}: IResourceVoteControls) {
  return (
    <div className="d-flex flex-row flex-wrap gap-2 align-items-center text-dark">
      <div className={'d-flex flex-row gap-1'}>
        <span data-testid="likes-count">{resource.votesUp}</span>
        <i
          data-testid="like-button"
          className={`bi me-1 align-middle bi-hand-thumbs-up${
            resource.isCurrentUserLiked ? '-fill' : ''
          }`}
          role="button"
          onClick={onLike}
        />
      </div>
      <div className={'d-flex flex-row gap-1'}>
        <span data-testid="dislikes-count">{resource.votesDown}</span>
        <i
          data-testid="dislike-button"
          className={`bi me-1 align-middle bi-hand-thumbs-down${
            resource.isCurrentUserDisliked ? '-fill' : ''
          }`}
          role="button"
          onClick={onDislike}
        />
      </div>
    </div>
  )
}
