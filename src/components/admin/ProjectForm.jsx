import ImageUploader from './ImageUploader'
import { projectCategories, projectStages, projectStatuses } from '../../lib/onsiteProjects'

export default function ProjectForm({ values, setValues, files, setFiles, onSubmit, saving, submitLabel }) {
  const update = (key) => (event) => setValues((current) => ({ ...current, [key]: event.target.value }))
  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        <Field label="Project Title" value={values.title} onChange={update('title')} required />
        <Select label="Category" value={values.category} onChange={update('category')} options={projectCategories} />
        <Select label="Status" value={values.status} onChange={update('status')} options={projectStatuses} />
        <Field label="Location" value={values.location} onChange={update('location')} placeholder="Optional" />
        <Field label="Year" value={values.year} onChange={update('year')} placeholder="Optional" />
        <Select label="Stage for uploaded images" value={values.stage} onChange={update('stage')} options={['No stage', ...projectStages]} />
      </div>
      <label className="block text-xs text-cream-muted">
        Description
        <textarea value={values.description} onChange={update('description')} rows="5" className="mt-2 w-full resize-y border border-line bg-transparent px-3 py-3 text-sm text-cream outline-none transition-colors focus:border-gold" required />
      </label>
      <ImageUploader files={files} setFiles={setFiles} />
      <button type="submit" disabled={saving} className="w-full border border-gold px-5 py-3 text-[10px] tracking-[0.2em] text-gold uppercase transition-colors hover:bg-gold hover:text-ink disabled:cursor-wait disabled:opacity-50">
        {saving ? 'Saving project...' : submitLabel}
      </button>
    </form>
  )
}

function Field({ label, ...props }) {
  return <label className="block text-xs text-cream-muted">{label}<input {...props} className="mt-2 w-full border border-line bg-transparent px-3 py-3 text-sm text-cream outline-none transition-colors focus:border-gold" /></label>
}

function Select({ label, options, ...props }) {
  return <label className="block text-xs text-cream-muted">{label}<select {...props} className="mt-2 w-full border border-line bg-ink-elevated px-3 py-3 text-sm text-cream outline-none transition-colors focus:border-gold">{options.map((option) => <option key={option} value={option === 'No stage' ? '' : option}>{option}</option>)}</select></label>
}