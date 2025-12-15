export default function CustomCakeForm({ formData, onChange, onSubmit }) {
  return (
    <form onSubmit={onSubmit}>
      <h2>Order a Custom Cake</h2>
      <div className="cake-form">
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={onChange}
            required
            className="form-control"
          />
        </label>
        <label>
          Contact Number:
          <input
            type="number"
            name="contactNumber"
            value={formData.contactNumber}
            onChange={onChange}
            required
            className="form-control"
          />
        </label>
        <label>
          Approximate Guest Count:
          <input
            type="text"
            name="guestCount"
            value={formData.guestCount}
            onChange={onChange}
            required
            className="form-control"
          />
        </label>
        <label>
          Number of Tiers:
          <input
            type="number"
            name="tierCount"
            value={formData.tierCount}
            onChange={onChange}
            required
            className="form-control"
          />
        </label>
        <label>
          Base Flavor:
          <input
            type="text"
            name="baseFlavor"
            value={formData.baseFlavor}
            onChange={onChange}
            required
            className="form-control"
          />
        </label>
        <label>
          Filling:
          <input
            type="text"
            name="filling"
            value={formData.filling}
            onChange={onChange}
            required
            className="form-control"
          />
        </label>
        <label>
          Size:
          <input
            type="text"
            name="size"
            value={formData.size}
            onChange={onChange}
            className="form-control"
          />
        </label>
        <label>
          Cake Shape:
          <input
            type="text"
            name="shape"
            value={formData.shape}
            onChange={onChange}
            required
            className="form-control"
          />
        </label>
        <label>
          Cake Colors:
          <input
            type="text"
            name="colors"
            value={formData.colors}
            onChange={onChange}
            required
            className="form-control"
          />
        </label>
        <label>
          Cake Writing
          <input
            type="text"
            name="writing"
            value={formData.writing}
            onChange={onChange}
            className="form-control"
          />
        </label>
        <label>
          Inpsiration Picture:
          <input
            type="file"
            name="inspiration"
            onChange={onChange}
            className="form-control"
          />
        </label>
        <label>
          Dietary Restrictions:
          <input
            type="text"
            name="dietaryRestrictions"
            value={formData.dietaryRestrictions}
            onChange={onChange}
            className="form-control"
          />
        </label>
        <label>
          Additional Specification:
          <input
            type="text"
            name="misc"
            value={formData.misc}
            onChange={onChange}
            className="form-control"
          />
        </label>
        <button
          type="submit"
        >
          Submit Order
        </button>

      </div>

    </form>
  );
}
